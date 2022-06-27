import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CarInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  color: string;

  @Field(() => Int)
  @IsNotEmpty()
  issueYear: number;
}
