import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './starship.entity';
import { Repository } from 'typeorm';
import { NewStarshipInput } from './dto/new.starship.input';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    readonly starshipRepository: Repository<Starship>
  ) {}

  async findAll(): Promise<Starship[]> {
    return this.starshipRepository.find();
  }

  async findPaginated({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<Starship[]> {
    return this.starshipRepository.find({
      skip: page * size,
      take: size,
      order: { id: 'ASC' },
    });
  }

  async findOneRandom(): Promise<Starship> {
    return this.starshipRepository
      .createQueryBuilder('starship')
      .orderBy('RANDOM()')
      .getOne();
  }

  async findOne(id: number): Promise<Starship> {
    return this.starshipRepository.findOneBy({ id });
  }

  async create(newStarship: NewStarshipInput): Promise<Starship> {
    return this.starshipRepository.save(
      this.starshipRepository.create(newStarship)
    );
  }

  async createMany(newStarships: NewStarshipInput[]): Promise<Starship[]> {
    return this.starshipRepository.save(
      this.starshipRepository.create(newStarships)
    );
  }

  async updateScore(id: number): Promise<Starship> {
    await this.starshipRepository.increment({ id }, 'score', 1);
    return this.starshipRepository.findOneBy({ id });
  }
}
