import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CarsModule } from './cars/cars.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './drivers/drivers.module';
import { createCarsLoader } from './cars/cars.dataloader';
import { CarsService } from './cars/cars.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [CarsModule],
      driver: ApolloDriver,
      useFactory: (carsService: CarsService) => ({
        autoSchemaFile: true,
        sortSchema: true,
        playground: true,
        context: () => ({
          carsLoader: createCarsLoader(carsService),
        }),
      }),

      inject: [CarsService],
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
        host: config.get<string>('HOST'),
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
    DriversModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
