import { Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import RequestWithUser from '../auth/requestWithUser.interface';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';
import { ProviderServices } from './providerServices.service';

@Controller('provider-services')
export class ServicesController {
    constructor(
        private readonly providerService: ProviderServices,
    ) { }

    @Post('hero')
    @UseInterceptors(FileInterceptor('file'))
    async addHero(@UploadedFile() file: Express.Multer.File) {

        const uploadedHero =  await this.providerService.addHero(file.buffer, file.originalname);
        return  { id: uploadedHero.id };
    }

    
    @Get(":id")
    async getServiceById(@Param("id") id: number) {
      const user = await this.providerService.getServiceById(id);
      return user
    }
}
