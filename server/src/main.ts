import { NestFactory } from '@nestjs/core';
import {  ValidationPipe , Logger} from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'; 
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'body-parser';
// import { graphqlUploadExpress } from 'graphql-upload-ts';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });
  const logger = new Logger();

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  // app.use(graphqlUploadExpress({maxFileSize: 1000000, maxFiles: 10 }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
    );
    
    app.use(cookieParser());

    // app.useGlobalInterceptors(new ClassSerializerInterceptor(
    //   app.get(Reflector))
    // );
  const configService = app.get(ConfigService);

  
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });
  const port = configService.get('PORT') ?? 3001 ;
  await app.listen(port);
  logger.log(`Application is up and  running on ${port}`);
}
bootstrap();