import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryFile } from './entity/CloudinaryFile.entity';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      CloudinaryFile
    ]),
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
