import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import User from './entity/user.entity';
import Client from "./entity/client.entity";
import Provider from "./entity/provider.entity";
import Certification from './entity/certification.entity';
import { ProviderServicesModule } from '../providerServices/providerServices.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Client,
      Provider,
      Certification
    ]),
    forwardRef(() => ProviderServicesModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule { }