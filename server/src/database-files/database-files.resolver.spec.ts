import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFilesResolver } from './database-files.resolver';

describe('DatabaseFilesResolver', () => {
  let resolver: DatabaseFilesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFilesResolver],
    }).compile();

    resolver = module.get<DatabaseFilesResolver>(DatabaseFilesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
