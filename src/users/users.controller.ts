import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SeedUserDto } from './dto/seed-user.dto';
import { Role } from 'src/shared/enums/role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('seed')
  async seed(@Body() dto?: SeedUserDto) {
    // Se não passar dados, usa valores padrão
    const seedData = {
      email: dto?.email || 'admin@admin.com',
      password: dto?.password || '123456',
      role: Role.ADMIN,
    };

    const exists = await this.usersService.findByEmail(seedData.email);
    if (exists) return { message: 'User already exists' };

    const user = await this.usersService.create(seedData);
    return { message: 'Seed created', user };
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
