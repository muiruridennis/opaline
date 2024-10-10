import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from "./dto/createUserDto";
import { LoginDTO } from "./dto/loginDto";
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import User from './entity/user.entity';
import Provider from './entity/provider.entity';
import Certification from './entity/certification.entity';
import { CreateProviderInput } from './dto/createProvider.input';
import { ProviderServices } from './../providerServices/providerServices.service';
import { UpdateProviderInput } from './dto/updateProvider.input';
import Client from './entity/client.entity';


@Injectable()
export class UsersService {
    private readonly saltRounds = 10;
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Provider)
        private providerRepository: Repository<Provider>,
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(Certification)
        private certificationRepository: Repository<Certification>,
        private readonly providerServices: ProviderServices

    ) { }
    async createNewUser(userData: CreateUserDTO) {
        const newUser = await this.usersRepository.create(userData)
        await this.usersRepository.save(newUser);
        
        // Check the role and create the associated profile
        if (userData.role === 'client') {
            const newClient = this.clientRepository.create({ user: newUser });
            await this.clientRepository.save(newClient);
        } 
        return newUser;
    }

    async findByLogin({ email, password }: LoginDTO) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository.find();
        users.forEach(user =>
            user.password = undefined
            // user.currentHashedRefreshToken = undefined;
        );
        return users;
    };

    async getById(id: number) {
        const user = await this.usersRepository.findOneBy({ id })
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND
        );
    }

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this email does not exist',
            HttpStatus.NOT_FOUND
        );
    }




    //To be implemented in Auth controller 
    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersRepository.update(userId, {
            currentHashedRefreshToken
        });
    };

    //To be used in refresh-token-strategy to check if refresh token matches the user.currentHashedRefreshToken
    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.getById(userId);

        const refreshTokenIsMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken
        );

        if (refreshTokenIsMatching) {
            return user;
        }
    };

    //   removing the refresh token from the database
    async removeRefreshToken(userId: number) {
        return this.usersRepository.update(userId, {
            currentHashedRefreshToken: null
        });
    };

    async markEmailAsConfirmed(email: string) {
        return this.usersRepository.update(
            { email },
            {
                isEmailConfirmed: true,
            },
        );
    }
    async setResetLink(email: string, token: string) {
        return this.usersRepository.update(
            { email },
            {
                resetLink: token,
            },
        );
    }
    async resetPassword(email: string, newPassword: string) {
        await this.usersRepository.update(
            { email },
            {
                password: newPassword,
                resetLink: null
            },
        );
        return { Message: "Password Changed Successfully" };
    }

    markPhoneNumberAsConfirmed(userId: number) {
        return this.usersRepository.update({ id: userId }, {
            isPhoneNumberConfirmed: true
        });
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne(
            {
                where: { id }
            });
        if (!user) {
            throw new HttpException(`user with id ${id} does not exist`, HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.delete(id);
        return { Message: "user deleted successfully" };
    }


    async createWithGoogle(email: string, name: string) {
        // const stripeCustomer = await this.stripeService.createCustomer(name, email);
        const newUser = await this.usersRepository.create({
            email,
            name,
            isRegisteredWithGoogle: true,
            // stripeCustomerId: stripeCustomer.id,
        });

        await this.usersRepository.save(newUser);
        return newUser;
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async getByResetLink(resetLink: string) {
        const user = await this.usersRepository.findOneBy({ resetLink });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User does not exist',
            HttpStatus.NOT_FOUND
        );
    }

    async getProviderByUserId(userId: number) {
        const provider = await this.providerRepository.findOne({
            where: { user: { id: userId } }
        });
        if (provider) {
            return provider;
        }
        throw new HttpException(
            'provider does not exist',
            HttpStatus.NOT_FOUND
        );
    }
    async getClientByUserId(userId: number) {
        const client = await this.clientRepository.findOne({
            where: { user: { id: userId } }
        });
        if (client) {
            return client;
        }
        throw new HttpException(
            'Client does not exist',
            HttpStatus.NOT_FOUND
        );
    }
    async createProviderProfile(userId: number, createProviderInput: CreateProviderInput) {
        const user = await this.getById(userId);
        const { certifications, services, reviews, ...providerData } = createProviderInput;

        if (user.role !== 'provider') {
            throw new Error('Unauthorized: Only users with the PROVIDER role can create a profile');
        }
        const provider = this.providerRepository.create({
            ...providerData,
            user,
        });
        // Save Provider first to get the provider instance
        const savedProvider = await this.providerRepository.save(provider);

        if (certifications) {
            const certificationEntities = certifications.map(cert => {
                return this.certificationRepository.create({
                    ...cert,
                    provider: savedProvider,
                });
            });
            await this.certificationRepository.save(certificationEntities);
        }
        // Handle Services if provided
        if (services) {
            await services.map(service => {
                return this.providerServices.createProviderService(service, savedProvider,)

            });
        }
        return savedProvider;
    }
    async updateProviderProfile(
        userId: number,
        updateProviderProfileInput: UpdateProviderInput,
    ) {
        const provider = await this.getProviderByUserId(userId)
        Object.assign(provider, updateProviderProfileInput);

        return this.providerRepository.save(provider);
    }
}