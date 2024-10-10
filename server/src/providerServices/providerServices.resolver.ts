import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProviderServices } from './providerServices.service';
import { Providerservice } from './models/providerService.model';
import { CreateServiceInput } from './dto/providerService.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UsersService } from '../users/users.service';
import { DeleteServiceResponse } from './dto/DeleteServiceResponse';
import { UpdateServiceInput } from './dto/updateproviderService.input';


@Resolver(() => Providerservice)
export class ProviderServicesResolver {
    constructor(
        private readonly providerServices: ProviderServices,
        private readonly usersServices: UsersService
    ) { }

    @UseGuards(GraphqlJwtAuthGuard)
    @Mutation(() => Providerservice)
    async createProviderService(
        @Args('createServiceInput') createServiceInput: CreateServiceInput,
        @Context() context: { req: RequestWithUser },
    ) {
        const userId = context.req.user.id;
        const provider = await this.usersServices.getProviderByUserId(userId);

        return this.providerServices.createProviderService(createServiceInput, provider);
    }

    // Query to get a single service by ID
    @Query(() => Providerservice)
    async getServiceById(@Args('id', { type: () => Int }) id: number) {
        return this.providerServices.getServiceById(id);
    }

    @Mutation(() => Providerservice)
    async updateProviderService(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
    ) {
        return this.providerServices.updateProviderService(id, updateServiceInput);
    }

    @Mutation(() => DeleteServiceResponse)
    async deleteProviderService(@Args('id', { type: () => Int }) id: number) {
        await this.providerServices.deleteProviderService(id);
        return {
            success: true,
            message: " Service deleted successfully"
        };
    }

    // Query to get all services with pagination
    @Query(() => [Providerservice])
    async getAllServices(
        @Args('limit', { type: () => Int, nullable: true }) limit = 10,
        @Args('offset', { type: () => Int, nullable: true }) offset = 0,
    ) {
        const { services, pageInfo } = await this.providerServices.getAllServices(limit, offset);
        return {
            services,
            pageInfo,
        };
    }

}
