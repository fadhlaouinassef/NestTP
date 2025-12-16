import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from '../entities/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messageRepository: Repository<Messages>,
  ) {}

  async create(content: string, status: string): Promise<Messages> {
    const message = this.messageRepository.create({
      content,
      status,
      date: new Date(),
    });
    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Messages[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: string): Promise<Messages | null> {
    return await this.messageRepository.findOne({ where: { id } as any });
  }
}
