import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Utilisateurs } from '../entities/utilisateurs/utilisateurs';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateurs])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
