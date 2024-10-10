import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmationResolver } from './email-confirmation.resolver';

describe('EmailConfirmationResolver', () => {
  let resolver: EmailConfirmationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConfirmationResolver],
    }).compile();

    resolver = module.get<EmailConfirmationResolver>(EmailConfirmationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
