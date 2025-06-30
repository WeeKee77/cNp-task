import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class NewStarshipInput {
  @Field()
  @IsInt()
  @IsPositive()
  crew: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
