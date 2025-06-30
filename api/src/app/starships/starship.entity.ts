import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Starship {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('int')
  crew: number;

  @Field(() => Int)
  @Column('int', { default: 0 })
  score: number;

  @Field(() => String)
  @Column()
  name: string;
}
