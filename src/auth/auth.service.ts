import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { NewUserDto } from 'src/validations/new-user.dto';
import { SignInDto } from 'src/validations/sign-in.dto';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcyrpt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        private readonly jwtService: JwtService
    ){}

    async signUp(payload: NewUserDto){
        try {
            const data = this.userRepository.create({
                nama_lengkap: payload.nama_lengkap,
                email: payload.email,
                password: await bcyrpt.hash(payload.password, bcyrpt.genSaltSync())
            })
            
            return await this.userRepository.insert(data)
        } catch (error) {
            if(error instanceof QueryFailedError){
                const driverErrorMessage = error.driverError.message;
                if (driverErrorMessage.includes('duplicate key value violates unique constraint')) {
                    throw new ConflictException(`unique constraint violation on ${error.message}`)
                }
                else throw new UnprocessableEntityException(`insertion error ${error.message}`)
            }
            else throw new InternalServerErrorException(error)
        }
    }

    async signIn(payload: SignInDto){
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: payload.email
                }
            });
    
            if(!user){
                throw new UnauthorizedException('incorrect email or password')
            }
    
            const isValid = await bcyrpt.compare(payload.password, user.password)
            if(!isValid){
                throw new UnauthorizedException('incorrect email or password')
            }
    
            const tokenPayload = {
                user_id: user.user_id,
                nama_lengkap: user.nama_lengkap,
                password: user.password
            }
    
            const acc_token = await this.jwtService.signAsync(tokenPayload, { secret: process.env.SECRET_KEY_AUTH })
    
            await this.userRepository.update(
                user.user_id,
                { acc_token: acc_token }
            )
    
            return {
                acc_token: acc_token,
                user_id: user.user_id
            }            
        } catch (error) {
            console.error(error)   
        }
    }

    async logout(user_id: string){
        return await this.userRepository.update(
            user_id,
            { acc_token: null }
        )
    }
}
