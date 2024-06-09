import { Body, Controller, HttpCode, HttpStatus, Logger, Param, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { NewUserDto } from 'src/validations/new-user.dto';
import { SignInDto } from 'src/validations/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signup(@Req() req: Request, @Body() body: NewUserDto, @Res({ passthrough: true }) resp: Response){
        const beforeTime: any = new Date()
        await this.authService.signUp(body)
        const result = await this.authService.signIn({ email: body.email, password: body.password })
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            result,
            message: 'welcome'
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signin(@Req() req: Request, @Body() body: SignInDto, @Res({ passthrough: true }) resp: Response){
        console.log(req.session)
        const beforeTime: any = new Date()
        const result = await this.authService.signIn(body)
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            result,
            message: 'welcome'
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signout/:user_id')
    async signout(@Req() req: Request, @Param('user_id') user_id: string){
        const beforeTime: any = new Date()
        await this.authService.logout(user_id)
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            message: 'good bye'
        }
    }
}
