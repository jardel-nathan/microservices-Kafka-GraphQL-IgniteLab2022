//* os inputs são usados para criar os inputs do graphql 
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput { // input type para criar um produto
  @Field()
  title: string;
}