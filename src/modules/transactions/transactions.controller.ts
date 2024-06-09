import { Body, Controller, HttpCode, HttpStatus, Logger, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Request } from 'express';
import { PaymentDTO } from 'src/validations/payment.dto';

@Controller('/transactions')
export class TransactionsController {
    constructor(
        private readonly trx_service: TransactionsService,
        private readonly logger: Logger
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('/payment/:user_id/:product_id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async execPayment(@Req() req: Request, @Param('user_id') user_id: string, @Param('product_id') product_id: string, @Body() body: PaymentDTO){
        const beforeTime: any = new Date()
        const res = await this.trx_service.processPayment(user_id, product_id, body)
        const afterTime: any = new Date()
    
        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            message: 'payment success'
        }
    }
}
