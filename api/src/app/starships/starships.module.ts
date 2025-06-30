import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './starship.entity';
import { StarshipsService } from './starships.service';
import { StarshipsResolver } from './starships.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  providers: [StarshipsService, StarshipsResolver],
})
export class StarshipsModule {}
