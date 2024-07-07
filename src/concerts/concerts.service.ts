import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) {}

  async create(concert: any): Promise<Concert> {
    return this.concertsRepository.save(concert);
  }

  async findAll(): Promise<Concert[]> {
    return this.concertsRepository.find();
  }

  async findOne(id: string): Promise<Concert> {
    return this.concertsRepository.findOne({ where: { id } });
  }

  async searchByName(name: string): Promise<Concert[]> {
    return this.concertsRepository.find({ where: { name: name } });
  }
}
