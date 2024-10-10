import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  mixin,
  Type,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import FeatureFlagsService from './feature-flags.service';

function FeatureFlagGuard(featureFlagName: string): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly featureFlagsService: FeatureFlagsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Create GraphQL context (even if request is not needed)
      const ctx = GqlExecutionContext.create(context);

      const isEnabled = await this.featureFlagsService.isEnabled(featureFlagName);
      if (!isEnabled) {
        throw new NotFoundException(`Feature ${featureFlagName} is not enabled`);
      }

      return true;
    }
  }

  return mixin(Guard);
}

export default FeatureFlagGuard;
