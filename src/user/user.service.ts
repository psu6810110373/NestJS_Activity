import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // นำเข้า bcrypt

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // --- 1. Auto Create Admin (Seeding) ---
  async onModuleInit() {
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('Seeding Admin User...');
      await this.create({
        email: 'admin@bookstore.com',
        password: 'adminpassword',
        role: UserRole.ADMIN,
      } as any);
    }
  }

  async create(createUserDto: CreateUserDto) {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}