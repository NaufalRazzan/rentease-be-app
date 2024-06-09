import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailProducts } from 'src/entities/detailProduct.entity';
import { Products } from 'src/entities/product.entity';
import { FilterProductDto } from 'src/validations/filter-product.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(DetailProducts)
        private detailProductRepository: Repository<DetailProducts>
    ){}

    async fetchByCategory(category: string){
        return await this.productRepository.find({
            where: {
                category: category
            }
        })
    }

    async fetchFilter(filterBody: FilterProductDto, page: number, pageSize: number = 12){
        // handle pagination
        const skip = (page - 1) * pageSize

        let query = this.productRepository.createQueryBuilder('entity');

        query = this.filterProductsFunction(filterBody, query)

        const result = await query.take(pageSize).skip(skip).getMany()
        const total = await query.getCount()

        return {
            data: result,
            count: total
        }
    }

    private filterProductsFunction(filters: FilterProductDto, queryBuilder: SelectQueryBuilder<Products>){
        if(filters.vehicle_name){
            queryBuilder = queryBuilder.andWhere('entity.vehicle_name % :vehicle_name', {
                vehicle_name: filters.vehicle_name
            });
        }
        if(filters.category){
            queryBuilder = queryBuilder.andWhere('entity.category = :category', {
                category: filters.category
            });
        }
        if(filters.brandName && filters.brandName.length > 0){
            console.log('brand name: ', filters.brandName)
            queryBuilder = queryBuilder.andWhere('entity.brand_name IN (:...brand_name)', {
                brand_name: filters.brandName
            });
        }
        if(filters.transmission && filters.transmission.length > 0){
            queryBuilder = queryBuilder.andWhere('entity.transmission IN (:...transmission)', {
                transmission: filters.transmission
            });
        }
        if(filters.seatsNum && filters.seatsNum.length > 0){
            queryBuilder = queryBuilder.andWhere('entity.seats_num IN (:...seats_num)', {
                seats_num: filters.seatsNum
            });
        }
        if(filters.minPrice){
            queryBuilder = queryBuilder.andWhere('entity.rent_cost > :minPrice', {
                minPrice: filters.minPrice
            });
        }
        if(filters.maxPrice){
            queryBuilder = queryBuilder.andWhere('entity.rent_cost < :maxPrice', {
                maxPrice: filters.maxPrice
            });
        }
        if(filters.minPower){
            queryBuilder = queryBuilder.andWhere('entity.power > :minPower', {
                minPower: filters.minPrice
            });
        }
        if(filters.maxPower){
            queryBuilder = queryBuilder.andWhere('entity.power < :maxPower', {
                maxPower: filters.maxPrice
            });
        }
        if(filters.location && filters.location.length > 0){
            queryBuilder = queryBuilder.andWhere('entity.location IN (:...location)', {
                location: filters.location
            });
        }
        if(filters.sort && filters.sort !== 'none'){
            queryBuilder = queryBuilder.orderBy('entity.rent_cost', (filters.sort === 'asc' ? 'ASC' : 'DESC'))
        }

        return queryBuilder
    }

    async getDetailProduct(product_id: string){
        return await this.detailProductRepository
            .createQueryBuilder("detailsProduct")
            .innerJoinAndSelect("detailsProduct.product_id", "products")
            .where("detailsProduct.product_id = :product_id", { product_id: product_id })
            .getOne()
    }
}
