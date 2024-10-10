import { Resolver, Mutation, Args } from '@nestjs/graphql';
import  DatabaseFilesService  from './database-files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import DatabaseFile from './model/databaseFile.model';

@Resolver()
export class DatabaseFilesResolver {
  constructor(private readonly databaseFilesService: DatabaseFilesService) {}

  @Mutation(() => DatabaseFile) // Define the return type
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const { createReadStream, filename } = file;
    const dataBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = createReadStream();

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (error) => reject(error));
    });

    return this.databaseFilesService.uploadDatabaseFile(dataBuffer, filename);
  }
  async getFileById(id: number): Promise<DatabaseFile> {
    const file = await this.databaseFilesService.getFileById(id);;

    return file;
  }
}
