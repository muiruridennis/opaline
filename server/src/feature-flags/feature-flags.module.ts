import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlagsResolver } from './feature-flags.resolver';
import FeatureFlag from './entity/featureFlag.entity';
import FeatureFlagsService from './feature-flags.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag])],
  controllers: [],
  providers: [FeatureFlagsService, FeatureFlagsResolver],
  exports: [FeatureFlagsService],
})
export class FeatureFlagsModule {}