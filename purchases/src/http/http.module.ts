import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from 'src/database/database.module';
import { MessagingModule } from 'src/message/message.module';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchase.resolver';


@Module({
  imports: [

    ConfigModule.forRoot(), // forRoot() is used to load the configuration from the environment variables
    DatabaseModule,  // import the database module
    MessagingModule, // import the message module

    GraphQLModule.forRoot({driver: ApolloDriver,autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')}) // path to schema  file created by graphql-code-generator
],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    // Services
    ProductsService,
    PurchasesService,
    CustomersService,


  ],
})


export class HttpModule {}
