import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./product.entity";
import { Users } from "./user.entity";
import { CardInfo } from "./card_info.entity";
import { DriverCard } from "./driver_card.entity";

@Entity()
export class TransactionOrder{
    @PrimaryGeneratedColumn('uuid')
    trx_order_id: string

    @ManyToOne<Products>(() => Products)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
    product: Products

    @Column()
    product_id: string

    @ManyToOne<Users>(() => Users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user: Users

    @Column()
    user_id: string

    @ManyToOne<CardInfo>(() => CardInfo)
    @JoinColumn({ name: 'card_info_id', referencedColumnName: 'card_info_id' })
    card_info: CardInfo

    @Column()
    card_info_id: string

    @ManyToOne<DriverCard>(() => DriverCard)
    @JoinColumn({ name: 'driver_card_id', referencedColumnName: 'driver_card_id' })
    driver_card: DriverCard

    @Column()
    driver_card_id: string
    
    @Column({
        type: 'timestamptz',
    })
    pickup_date: Date

    @Column({
        type: 'timestamptz'
    })
    dropOff_date: Date

    @Column({
        type: 'int'
    })
    total_amounts: number
}