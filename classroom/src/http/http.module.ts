import { ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from 'src/database/database.module';
import { TestResolver } from 'src/http/test.resolver';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule, 
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'), // path to schema  file created by graphql-code-generator
  })],
  providers: [TestResolver],
})


export class HttpModule {}
