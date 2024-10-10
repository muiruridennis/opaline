import { forwardRef, Module } from '@nestjs/common';
import { ServicesController } from './ProviderServices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProviderServices } from './providerServices.service';
import Providerservice from './entity/providerServices.entity';
import { ProviderServicesResolver } from './providerServices.resolver';
import { UsersModule } from '../users/users.module';
import { DatabaseFilesModule } from '../database-files/database-files.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Providerservice
    ]),
    forwardRef(() => UsersModule),
    DatabaseFilesModule,
    CloudinaryModule
  ],
  controllers: [ServicesController],
  providers: [ProviderServices, ProviderServicesResolver, 
  ],
  exports: [ProviderServices]
})
export class ProviderServicesModule { }
