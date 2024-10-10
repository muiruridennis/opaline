import { UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Resolver, Mutation, Args, Context, Query, Int } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import { Provider } from './models/provider.model';
import { CreateProviderInput } from './dto/createProvider.input';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UpdateProviderInput } from './dto/updateProvider.input';


@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,

    ) { }

    @Query(() => [User])
    async getUsers() {
        const users = await this.usersService.getAllUsers();
        return users;
    }
    

    @Query(() => User)
    async getUserById(@Args('id', { type: () => Int }) id: number) {
        const user = await this.usersService.getById(id);
        return user;
    }

    @Mutation(() => User)
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        const user = await this.usersService.remove(id);
        return user;
    }

    @UseGuards(GraphqlJwtAuthGuard)
    @Mutation(() => Provider)
    async createProviderProfile(
        @Args('createProviderInput') createProviderInput: CreateProviderInput,
        @Context() context: { req: RequestWithUser },
    ) {
        const userId = context.req.user.id;

        return this.usersService.createProviderProfile(userId, createProviderInput);
    }
    
    @UseGuards(GraphqlJwtAuthGuard)
    @Mutation(() => Provider)
    async updateProviderProfiles(
        @Context() context: { req: RequestWithUser },
        @Args('updateProviderInput') updateProviderInput: UpdateProviderInput,
    ) {
        const userId = context.req.user.id;

        return this.usersService.updateProviderProfile(userId, updateProviderInput);
    }



   
}
