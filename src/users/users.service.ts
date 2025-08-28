import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Cria usuário com hash da senha
  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    user.password = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.save(user);
  }

  // Retorna todos usuários (sem senha nem refresh token)
  findAll() {
    return this.usersRepository.find({
      select: ['id', 'email', 'role'],
    });
  }

  // Busca usuário por ID (com opção de incluir senha e refresh token)
  async findOne(id: string, withPassword = false) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: withPassword
        ? ['id', 'email', 'password', 'role', 'currentHashedRefreshToken']
        : ['id', 'email', 'role'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  // Atualiza usuário com hash da senha se necessário
  async update(id: string, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    await this.usersRepository.update(id, dto);
    return this.findOne(id);
  }

  // Remove usuário
  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  // ===== Métodos para refresh token =====

  async setCurrentRefreshToken(userId: string, refreshTokenHash: string) {
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken: refreshTokenHash,
    });
  }

  async removeRefreshToken(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id'],
    });
    if (!user) return false;

    user.currentHashedRefreshToken = null;
    await this.usersRepository.save(user);
    return true;
  }

  // Busca user por email (com ou sem senha)
  async findByEmail(email: string, withPassword = false) {
    return this.usersRepository.findOne({
      where: { email },
      select: withPassword
        ? ['id', 'email', 'password', 'role', 'currentHashedRefreshToken']
        : ['id', 'email', 'role'],
    });
  }
}
