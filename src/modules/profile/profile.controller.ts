import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from 'src/validations/update-profile.dto';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly logger: Logger
    ){}

    @HttpCode(HttpStatus.OK)
    @Get('getProfile/:userId')
    async getProfile(@Req() req: Request, @Param('userId') userId: string){
        const beforeTime: any = new Date()
        const res = await this.profileService.getProfile(userId)
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            profile: {
                nama_lengkap: res.nama_lengkap,
                NIK: res.nik,
                email: res.email,
                no_hp: res.no_hp,
                alamat: res.alamat,
            },
            message: `profile for ${res.nama_lengkap} fetched`
        }
    }

    @HttpCode(HttpStatus.OK)
    @Patch('updateProfile/:userId')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateProfile(@Req() req: Request, @Param('userId') userId: string, @Body() body: UpdateProfileDto){
        const beforeTime: any = new Date()
        const res = await this.profileService.updateProfile(userId, body, (body.nik && true))
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            ...res,
            message: 'profile has been updated'
        }
    }
}
