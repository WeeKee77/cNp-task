import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Starship } from './starship.entity';
import { StarshipsService } from './starships.service';
import { NewStarshipInput } from './dto/new.starship.input';
import { ParseIntPipe } from '@nestjs/common';
import { MinValuePipe } from '../pipes/minValue.pipe';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Query(() => Starship)
  async starship(@Args('id', { type: () => Int }) id: number) {
    return this.starshipsService.findOne(id);
  }

  @Query(() => Starship)
  async getRandomStarship(): Promise<Starship> {
    return this.starshipsService.findOneRandom();
  }

  @Query(() => [Starship])
  async getAllStarships(): Promise<Starship[]> {
    return this.starshipsService.findAll();
  }

  @Query(() => [Starship])
  async getPaginatedStarships(
    @Args(
      'page',
      {
        type: () => Int,
        nullable: true,
        defaultValue: 0,
      },
      ParseIntPipe,
      new MinValuePipe(0)
    )
    page?: number,

    @Args(
      'size',
      {
        type: () => Int,
        nullable: true,
        defaultValue: 10,
      },
      ParseIntPipe,
      new MinValuePipe(6)
    )
    size?: number
  ): Promise<Starship[]> {
    return this.starshipsService.findPaginated({ page, size });
  }

  @Mutation(() => Starship)
  async createStarship(
    @Args('newStarshipData') newStarshipData: NewStarshipInput
  ): Promise<Starship> {
    return this.starshipsService.create(newStarshipData);
  }

  @Mutation(() => [Starship])
  createManyStarships(
    @Args('newStarshipsData', { type: () => [NewStarshipInput] })
    data: NewStarshipInput[]
  ): Promise<Starship[]> {
    return this.starshipsService.createMany(data);
  }

  @Mutation(() => Starship)
  async updateScore(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Starship> {
    return this.starshipsService.updateScore(id);
  }
}
