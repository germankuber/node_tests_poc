import { newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

describe('UserService', () => {
  let dataSource: DataSource;
  let userRepository: UserRepository;
  let userService: UserService;

  beforeAll(async () => {
    const db = newDb();
    
    // Register the functions that TypeORM needs
    db.public.registerFunction({
      name: 'version',
      implementation: () => 'PostgreSQL 13.0',
    });
    
    db.public.registerFunction({
      name: 'current_database',
      implementation: () => 'test_db',
    });
    
    dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [User],
      synchronize: true,
    });
    await dataSource.initialize();

    userRepository = new UserRepository(dataSource);
    userService = new UserService(userRepository);
  });

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  beforeEach(async () => {
    await dataSource.getRepository(User).clear();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = await userService.createUser('John Doe', 'john@example.com');

      expect(user).toBeDefined();
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.id).toBeDefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      await userService.createUser('John Doe', 'john@example.com');
      await userService.createUser('Jane Smith', 'jane@example.com');

      const users = await userService.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users.map(u => u.name)).toContain('John Doe');
      expect(users.map(u => u.name)).toContain('Jane Smith');
    });

    it.only('should return empty array when no users exist', async () => {
      const users = await userService.getAllUsers();
      console.log(users);
      expect(users).toHaveLength(0);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      await userService.createUser('John Doe', 'john@example.com');

      const user = await userService.getUserByEmail('john@example.com');

      expect(user).toBeDefined();
      expect(user?.name).toBe('John Doe');
      expect(user?.email).toBe('john@example.com');
    });

    it('should return null for non-existent email', async () => {
      const user = await userService.getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });
  });

  describe('filterUsers', () => {
    beforeEach(async () => {
      await userService.createUser('John Doe', 'john@example.com');
      await userService.createUser('Jane Doe', 'jane@example.com');
      await userService.createUser('Bob Smith', 'bob@company.com');
      await userService.createUser('Alice Johnson', 'alice@example.com');
    });

    it('should filter users by exact email', async () => {
      const users = await userService.filterUsers({ email: 'john@example.com' });

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe('John Doe');
    });

    it('should filter users by exact name', async () => {
      const users = await userService.filterUsers({ name: 'John Doe' });

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('john@example.com');
    });

    it('should filter users by name containing substring', async () => {
      const users = await userService.filterUsers({ nameContains: 'Doe' });

      expect(users).toHaveLength(2);
      expect(users.map(u => u.name)).toContain('John Doe');
      expect(users.map(u => u.name)).toContain('Jane Doe');
    });

    it('should filter users by email domain', async () => {
      const users = await userService.filterUsers({ emailDomain: 'example.com' });

      expect(users).toHaveLength(3);
      expect(users.map(u => u.name)).toContain('John Doe');
      expect(users.map(u => u.name)).toContain('Jane Doe');
      expect(users.map(u => u.name)).toContain('Alice Johnson');
    });

    it('should return all users when no filter options provided', async () => {
      const users = await userService.filterUsers({});

      expect(users).toHaveLength(4);
    });

    it('should handle case insensitive name search', async () => {
      const users = await userService.filterUsers({ nameContains: 'doe' });

      expect(users).toHaveLength(2);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = await userService.createUser('John Doe', 'john@example.com');
      
      await userService.deleteUser(user.id);
      
      const deletedUser = await userService.getUserByEmail('john@example.com');
      expect(deletedUser).toBeNull();
    });
  });
});