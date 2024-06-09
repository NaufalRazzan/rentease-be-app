import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
import { TransactionOrder } from "./transaction_order.entity";

@Entity()
export class CardInfo{
    @PrimaryGeneratedColumn('uuid')
    card_info_id: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true
    })
    card_num: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true
    })
    card_holder_name: string

    @Column({
        type: 'varchar',
        length: 150,
    })
    expr_date: string

    @OneToOne<Users>(() => Users, (user) => user.user_id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id: string

    @OneToMany<TransactionOrder>(() => TransactionOrder, (trx_order) => trx_order.card_info, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    trx_order: TransactionOrder
}