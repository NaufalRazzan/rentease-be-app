import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DetailProducts } from "./detailProduct.entity";
import { TransactionOrder } from "./transaction_order.entity";

@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    product_id: string

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    vehicleName: string

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true
    })
    brand_name: string

    @Column({ type: "varchar", length: 200})
    location: string

    @Column({ type: "bigint",})
    rent_cost: number

    @Column({ 
        type: "varchar", 
        length: "50", 
        enum: ['Motor', 'Moge', 'Mobil', 'Supercar', 'Sepeda'],
    })
    category: string

    @Column({ type: "varchar", length: 200, })
    img_path: string

    @Column({
        type: 'varchar',
        length: '100',
        enum: ['Automatic', 'Manual', 'N/A'],
    })
    transmission: string

    @Column({
        type: 'int',
        nullable: false
    })
    seats_num: number

    @Column({
        type: 'int',
        nullable: false
    })
    power: number

    @OneToOne(() => DetailProducts, (detail_product) => detail_product.product_id, { cascade: true, eager: true,})
    detail_products: DetailProducts

    @OneToMany<TransactionOrder>(() => TransactionOrder, (trx_order) => trx_order.product, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    trx_order: TransactionOrder
}