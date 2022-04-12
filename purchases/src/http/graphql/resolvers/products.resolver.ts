import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {

 constructor(
  private productsService: ProductsService
 ) { }

 @Query(() => [Product])
 // @UseGuards(AuthorizationGuard)
 products() {
  return this.productsService.listAllProducts();
 }


 @UseGuards(AuthorizationGuard) //* UseGuards: é um decorator que permite que o usuario seja autenticado para executar a query
 @Mutation(() => Product)
 createProduct(
  @Args('data') data: CreateProductInput //* args: é um decorator que permite que o usuario envie os dados para a query
  ) {
  return this.productsService.createProduct(data);
 }


 


}
