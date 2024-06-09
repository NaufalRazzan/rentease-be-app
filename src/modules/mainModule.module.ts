import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/product.entity";
import { HomeController } from "./home/home.controller";
import { HomeService } from "./home/home.service";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "src/auth/auth.module";
import { ProductsController } from "./products/products.controller";
import { ProductsService } from "./products/products.service";
import { DetailProducts } from "src/entities/detailProduct.entity";
import { Users } from "src/entities/user.entity";
import { ProfileController } from "./profile/profile.controller";
import { ProfileService } from "./profile/profile.service";
import { DriverCard } from "src/entities/driver_card.entity";
import { CardInfo } from "src/entities/card_info.entity";
import { TransactionOrder } from "src/entities/transaction_order.entity";
import { TransactionsController } from "./transactions/transactions.controller";
import { TransactionsService } from "./transactions/transactions.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Products,
            DetailProducts,
            Users,
            DriverCard,
            CardInfo,
            TransactionOrder
        ]),
        HttpModule,
        AuthModule
    ],
    controllers: [
        HomeController,
        ProductsController,
        ProfileController,
        TransactionsController
    ],
    providers: [
        HomeService,
        ProductsService,
        ProfileService,
        TransactionsService,
        Logger
    ]
})
export class MainModule{}