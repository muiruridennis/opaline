import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Service from './entity/providerServices.entity';
import { CreateServiceInput } from './dto/providerService.input';
import Provider from '../users/entity/provider.entity';
import { UpdateServiceInput } from './dto/updateproviderService.input';
import DatabaseFilesService from '../database-files/database-files.service';
import { CloudinaryService } from './../cloudinary/cloudinary.service';


@Injectable()
export class ProviderServices {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
        private databaseFilesService: DatabaseFilesService,
        private cloudinaryService: CloudinaryService,

    ) { }

    async addHero(imageBuffer: Buffer, filename: string) {
        const hero = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
        return hero;
    }
    async createProviderService(createServiceDto: CreateServiceInput, provider: Provider,) {
        const { file } = createServiceDto

        let cloudinaryFile = null;

        if (file) {
            const uploadResult = await this.cloudinaryService.uploadImage(file);
            cloudinaryFile = uploadResult
        }
        const newService = this.servicesRepository.create({
            ...createServiceDto,
            hero: cloudinaryFile,
            provider,
        });
        const savedService = await this.servicesRepository.save(newService);

        return savedService;
    }
    async getServiceById(id: number) {
        const service = await this.servicesRepository.findOne({
            where: { id },
            relations: ['provider', 'bookings'],
        })

        if (service) {
            return service;
        }
        throw new HttpException(
            'Service not found',
            HttpStatus.NOT_FOUND
        );
    }

    async updateProviderService(id: number, updateServiceDto: Partial<UpdateServiceInput>) {
        const service = await this.getServiceById(id);
        Object.assign(service, updateServiceDto); // Update only the provided fields
        return this.servicesRepository.save(service); // Save updated service
    }
    async deleteProviderService(id: number) {
        const service = await this.getServiceById(id);
        await this.servicesRepository.remove(service);
        return { message: 'Service deleted successfully' };
    }

    async getAllServices(limit: number = 10, offset: number = 0) {
        const [services, total] = await this.servicesRepository.findAndCount({
            relations: ['provider'], // Fetch related provider info
            take: limit, // Limit results per page
            skip: offset, // Offset to paginate
        });

        return {
            total,
            services,
            pageInfo: {
                currentPage: Math.ceil(offset / limit) + 1,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

}
