import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CarsModule } from './cars/cars.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      sortSchema: true,
      driver: ApolloDriver,
      playground: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: config.get<string>('MYSQL_USER'),
        password: config.get<string>('MYSQL_PASSWORD'),
        database: config.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + 'dist/**/*.entity.ts'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
