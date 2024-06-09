import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./product.entity";

@Entity()
export class DetailProducts{
    @PrimaryGeneratedColumn('uuid')
    detail_product_id: string

    @Column({
        type: 'int'
    })
    milage: number

    @Column({
        type: 'varchar',
        length: 100
    })
    color: string

    @Column({
        type: 'char',
        length: 10
    })
    release_year: string

    @Column({
        type: 'varchar',
        length: 100
    })
    body_type: string

    @Column({
        type: 'varchar',
        length: 100
    })
    fuel_type: string

    @Column({
        type: 'varchar',
        length: 300
    })
    description: string

    @OneToOne(() => Products, (product) => product.detail_products, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product_id: string
}