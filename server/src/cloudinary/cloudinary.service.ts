import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload-ts'; 
import { CloudinaryFile } from './entity/CloudinaryFile.entity';

@Injectable()
export class CloudinaryService {
    constructor(
        @InjectRepository(CloudinaryFile)
        private readonly cloudinaryFileRepository: Repository<CloudinaryFile>,
    ) { }

    async uploadImage(file: FileUpload): Promise<CloudinaryFile> {
        const { createReadStream } = file;

        // Create a file stream
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            // Use the createReadStream() method to handle the stream
            createReadStream().pipe(stream);
        });

        // Save the Cloudinary file details in the database
        const cloudinaryFile = this.cloudinaryFileRepository.create({
            url: uploadResult.url,
            public_id: uploadResult.public_id,
        });

        return this.cloudinaryFileRepository.save(cloudinaryFile);
    }
}

