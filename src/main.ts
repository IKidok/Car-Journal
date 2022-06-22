import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 3000;
  await app.listen(PORT, () => {
    console.log(`Server listening on address: localhost:${PORT}/graphql`);
  });
}
bootstrap();
