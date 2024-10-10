import { Module } from '@nestjs/common';
import  DatabaseFilesService  from './database-files.service';
import { DatabaseFilesResolver } from './database-files.resolver';
import DatabaseFile from './entity/databaseFile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import  DatabaseFilesController  from './database-files.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      DatabaseFile
    ]),
  ],
  providers: [DatabaseFilesService, DatabaseFilesResolver],
  exports:[DatabaseFilesService],
  controllers: [DatabaseFilesController]
})
export class DatabaseFilesModule {}
