import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(
    @Query('username') username?: string,
    @Query('status') status?: string,
  ): User[] {
    return this.usersService.findAll({ username, status });
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') authorization?: string,
  ): User {
    if (authorization) {
      console.log('Authorization header reçu:', authorization);
    }
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: CreateUserDto,
  ): User {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.usersService.remove(id);
    return { message: `Utilisateur ${id} supprimé avec succès.` };
  }

  @Get('active/:status')
  getActive(@Param('status') status: string): User[] {
    return this.usersService.findByStatus(status);
  }
}
