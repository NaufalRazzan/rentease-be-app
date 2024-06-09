import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { CardInfo } from 'src/entities/card_info.entity';
import { DriverCard } from 'src/entities/driver_card.entity';
import { TransactionOrder } from 'src/entities/transaction_order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Users,
            CardInfo,
            DriverCard,
            TransactionOrder
        ])
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        Logger
    ]
})
export class AuthModule {}
