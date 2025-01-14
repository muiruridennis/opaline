
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseFile from './entity/databaseFile.entity';
 
@Injectable()
class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}
 
  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer
    })
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }
 
  async getFileById(id: number) {
    const file = await this.databaseFilesRepository.findOneBy({id})
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
 
export default DatabaseFilesService;