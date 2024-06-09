import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DriverCard } from "./driver_card.entity";
import { CardInfo } from "./card_info.entity";
import { TransactionOrder } from "./transaction_order.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true,
    })
    nama_lengkap: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 200
    })
    password: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        default: null,
        nullable: true
    })
    nik: string

    @Column({
        type: 'varchar',
        length: 300,
        default: null,
        nullable: true
    })
    alamat: string

    @Column({
        type: 'varchar',
        length: 50,
        default: null,
        nullable: true
    })
    no_hp: string

    @Column({
        type: 'varchar',
        length: 500,
        default: null,
        nullable: true
    })
    acc_token: string

    @OneToOne(() => DriverCard, (driver_card) => driver_card.user_id, { cascade: true, eager: true})
    driver_card: DriverCard

    @OneToOne<CardInfo>(() => CardInfo, (card_info) => card_info.user_id, { cascade: true, eager: true})
    card_info: CardInfo

    @OneToMany<TransactionOrder>(() => TransactionOrder, (trx_order) => trx_order.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    trx_order: TransactionOrder
}