import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Users } from 'src/entities/user.entity';
import { UpdateProfileDto } from 'src/validations/update-profile.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        private readonly httpService: HttpService
    ){}

    async getProfile(userID: string){
        return await this.userRepository.findOneBy({
            user_id: userID
        })
    }

    async updateProfile(userId: string, body: UpdateProfileDto, updateNIK?:boolean){
        // validasi nik
        let validateNIK
        if(updateNIK){
            validateNIK = await this.mockCheckNIK(body)
            if(validateNIK.result.status !== 'success'){
                throw new BadRequestException('nik tidak valid')
            }
        }

        // await this.userRepository.update(
        //     userId,
        //     body,
        // )

        return {
            nik: (updateNIK ? validateNIK.result.pesan : 'not validating nik')
        }
    }

    private async mockCheckNIK(profileData: UpdateProfileDto){
        return {
            result: {
                status: 'success',
                pesan: 'VALID_NIK'
            }
        }
    }

    private async checkNIK(profileData: UpdateProfileDto){
        try {
            let body = new FormData()
            body.append('nik', profileData.nik)
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.post(
                    process.env.RAPIDAPI_URL,
                    body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                            'X-RapidAPI-Host': 'indonesia-ktp-parser-validator.p.rapidapi.com'
                        }
                    }
                )
            )
            return response.data
        } catch (error) {
            if(error instanceof AxiosError){
                throw new HttpException(error.message, error.status)
            }
            else throw error
        }
    }
}
