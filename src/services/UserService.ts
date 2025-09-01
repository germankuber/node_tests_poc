import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export interface UserFilterOptions {
  name?: string;
  email?: string;
  nameContains?: string;
  emailDomain?: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async filterUsers(options: UserFilterOptions): Promise<User[]> {
    if (options.email) {
      const user = await this.userRepository.findByEmail(options.email);
      return user ? [user] : [];
    }

    if (options.name) {
      return this.userRepository.findByName(options.name);
    }

    if (options.nameContains) {
      return this.userRepository.findByNameContaining(options.nameContains);
    }

    if (options.emailDomain) {
      return this.userRepository.findByEmailDomain(options.emailDomain);
    }

    return this.userRepository.findAll();
  }

  async createUser(name: string, email: string): Promise<User> {
    return this.userRepository.create({ name, email });
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}