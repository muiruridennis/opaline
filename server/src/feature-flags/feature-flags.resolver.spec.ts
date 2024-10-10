import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagsResolver } from './feature-flags.resolver';

describe('FeatureFlagsResolver', () => {
  let resolver: FeatureFlagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureFlagsResolver],
    }).compile();

    resolver = module.get<FeatureFlagsResolver>(FeatureFlagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
