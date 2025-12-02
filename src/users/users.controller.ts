import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { Utilisateurs } from '../entities/utilisateurs/utilisateurs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<Utilisateurs> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Utilisateurs[]> {
    return this.usersService.findAll();
  }

  @Get('active')
  async findActive(): Promise<Utilisateurs[]> {
    return this.usersService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Utilisateurs> {
    return this.usersService.findOneById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Utilisateurs> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Utilisateurs> {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id')
  async updateFull(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Utilisateurs> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post(':id/activate')
  async activateAccount(
    @Param('id') id: string,
    @Body() activateUserDto: ActivateUserDto,
  ): Promise<Utilisateurs> {
    return this.usersService.activateAccount(
      id,
      activateUserDto.password,
    );
  }
}
