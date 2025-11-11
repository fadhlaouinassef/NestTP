import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'Mohamed',
      email: 'mohamed@esprit.tn',
      status: 'active',
    },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  findAll(filter?: { username?: string; status?: string }): User[] {
    let result = this.users;
    if (filter) {
      if (filter.username) {
        const q = filter.username.toLowerCase();
        result = result.filter((u) => u.username.toLowerCase().includes(q));
      }
      if (filter.status) {
        result = result.filter((u) => u.status === filter.status);
      }
    }
    return result;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec id ${id} non trouvé.`);
    }
    return user;
  }

  create(dto: CreateUserDto): User {
    const nextId = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    const user: User = {
      id: nextId,
      username: dto.username,
      email: dto.email,
      status: dto.status ?? 'inactive',
    };
    this.users.push(user);
    return user;
  }

  update(id: number, dto: CreateUserDto): User {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Utilisateur avec id ${id} non trouvé.`);
    }
    const updated: User = {
      ...this.users[idx],
      username: dto.username ?? this.users[idx].username,
      email: dto.email ?? this.users[idx].email,
      status: dto.status ?? this.users[idx].status,
    };
    this.users[idx] = updated;
    return updated;
  }

  remove(id: number): void {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Utilisateur avec id ${id} non trouvé.`);
    }
    this.users.splice(idx, 1);
  }

  findByStatus(status: string): User[] {
    return this.users.filter((u) => u.status === status);
  }
}
