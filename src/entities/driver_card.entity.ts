import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
import { TransactionOrder } from "./transaction_order.entity";

@Entity()
export class DriverCard{
    @PrimaryGeneratedColumn('uuid')
    driver_card_id: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true
    })
    full_name: string

    @Column({
        type: 'varchar',
        length: 150
    })
    contact_num: string

    @Column({
        type: 'varchar',
        length: 150
    })
    country: string

    @Column({
        type: 'varchar',
        length: 150
    })
    city: string

    @Column({
        type: 'varchar',
        length: 150
    })
    postCode: string

    @OneToOne<Users>(() => Users, (user) => user.driver_card, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id: string

    @OneToMany<TransactionOrder>(() => TransactionOrder, (trx_order) => trx_order.driver_card, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    trx_order: TransactionOrder
}