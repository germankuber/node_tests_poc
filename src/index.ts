import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'test_db',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const userRepository = new UserRepository(AppDataSource);
    const userService = new UserService(userRepository);

    const user1 = await userService.createUser('John Doe', 'john@example.com');
    const user2 = await userService.createUser('Jane Smith', 'jane@example.com');
    
    console.log('Created users:', { user1, user2 });

    const allUsers = await userService.getAllUsers();
    console.log('All users:', allUsers);

    const filteredUsers = await userService.filterUsers({ nameContains: 'John' });
    console.log('Filtered users:', filteredUsers);

  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
}

if (require.main === module) {
  main();
}