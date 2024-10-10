import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateFeatureFlagInput } from './dto/createFeatureFlag.input';
import { FeatureFlagType } from './models/feature-flags.model';
import FeatureFlagsService from './feature-flags.service';
import { UpdateFeatureFlagInput } from './dto/updateFeatureFlag.input';

@Resolver(() => FeatureFlagType)
export class FeatureFlagsResolver {
    constructor(private readonly featureFlagsService: FeatureFlagsService) { }

    @Mutation(() => FeatureFlagType)
    async createFeatureFlag(
        @Args('createFeatureFlagInput') createFeatureFlagInput: CreateFeatureFlagInput,
    ) {
        return this.featureFlagsService.create(createFeatureFlagInput);
    }

    @Mutation(() => Boolean)
    async deleteFeatureFlag(@Args('id', { type: () => Int }) id: number) {
        await this.featureFlagsService.delete(id);
        return true;
    }

    @Mutation(() => FeatureFlagType)
    async updateFeatureFlag(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateFeatureFlagInput') updateFeatureFlagInput: UpdateFeatureFlagInput,
    ) {
        return this.featureFlagsService.update(id, updateFeatureFlagInput);
    }

}
