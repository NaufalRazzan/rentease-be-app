import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardInfo } from 'src/entities/card_info.entity';
import { DriverCard } from 'src/entities/driver_card.entity';
import { TransactionOrder } from 'src/entities/transaction_order.entity';
import { PaymentDTO } from 'src/validations/payment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionOrder)
        private trxOrderRepository: Repository<TransactionOrder>,
        @InjectRepository(DriverCard)
        private driverCardRepository: Repository<DriverCard>,
        @InjectRepository(CardInfo)
        private cardInfoRepository: Repository<CardInfo>
    ){}

    async processPayment(userId: string, productId: string, body: PaymentDTO){
        // insert to driver card
        const driverCard_data = await this.driverCardRepository.insert({
            full_name: body.driver_card.full_name,
            contact_num: body.driver_card.contact_num,
            country: body.driver_card.country,
            city: body.driver_card.city,
            postCode: body.driver_card.postCode,
            user_id: userId
        })
        const driverCard_id = driverCard_data.raw[0].driver_card_id

        // insert to card info
        const cardInfo_data = await this.cardInfoRepository.insert({
            card_num: body.card_info.card_num,
            card_holder_name: body.card_info.card_holder_name,
            expr_date: body.card_info.expr_date,
            user_id: userId
        })
        const cardInfo_id = cardInfo_data.raw[0].card_info_id

        // insert to trx_order
        return await this.trxOrderRepository.insert({
            product_id: productId,
            user_id: userId,
            card_info_id: cardInfo_id,
            driver_card_id: driverCard_id,
            pickup_date: body.pickUp_date,
            dropOff_date: body.dropOff_date,
            total_amounts: body.total_amount
        })
    }
}
