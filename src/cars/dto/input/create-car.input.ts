import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCarInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  color: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  issueDate: Date;
}
