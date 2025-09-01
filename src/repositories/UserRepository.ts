import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByName(name: string): Promise<User[]> {
    return this.repository.find({ where: { name } });
  }

  async findByNameContaining(name: string): Promise<User[]> {
    return this.repository.createQueryBuilder('user')
      .where('user.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findByEmailDomain(domain: string): Promise<User[]> {
    return this.repository.createQueryBuilder('user')
      .where('user.email ILIKE :domain', { domain: `%@${domain}%` })
      .getMany();
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}