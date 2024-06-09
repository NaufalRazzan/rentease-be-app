import { Controller, Get, HttpCode, HttpStatus, Logger, Param, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request } from 'express';
import { FilterProductDto } from 'src/validations/filter-product.dto';
import { PriceValidationPipe } from 'src/pipe/priceValidation.pipe';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
        private readonly logger: Logger
    ){}

    @HttpCode(HttpStatus.OK)
    @Get('/filterByCategory/:category')
    async fetchByCategory(@Req() req: Request, @Param('category') category: string){
        const beforeTime: any = new Date()
        const result = await this.productService.fetchByCategory(category)
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            result,
            message: `${result.length} fetched`
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/filterProduct/:page')
    async fetchFilteredProducts(
        @Req() req: Request,
        @Param('page') page: string,
        @Param('category') category?: string,
        @Query('vehicle_name') vehicle_name?: string,
        @Query('brandName') brandName?: string,
        @Query('transmission') transmission?: string,
        @Query('seatsNum') seatsNum?: string,
        @Query('minPrice', new PriceValidationPipe()) minPrice?: number,
        @Query('maxPrice', new PriceValidationPipe()) maxPrice?: number,
        @Query('minPower') maxPower?: string,
        @Query('maxpower') minPower?: string,
        @Query('location') location?: string,
        @Query('sort') sort?: string
    ){
        try {
            const beforeTime: any = new Date()
            const seatsNumConvert = seatsNum?.split(',').map((seatNum) => {
                return parseInt(seatNum)
            })
    
            const filterBody: FilterProductDto = {
                vehicle_name: vehicle_name,
                category: category,
                brandName: brandName && brandName.split(','),
                transmission: transmission && transmission.split(','),
                seatsNum: seatsNumConvert || undefined,
                minPrice: minPrice,
                maxPrice: maxPrice,
                minPower: parseInt(minPower) || undefined,
                maxPower: parseInt(maxPower) || undefined,
                location: location && location.split(','),
                sort: sort
            };

            const res_data = await this.productService.fetchFilter(filterBody, parseInt(page))
            const afterTime: any = new Date()
    
            const totalTime = afterTime - beforeTime
    
            this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)
    
            return {
                result: {
                    data: res_data,
                    pagination: {
                        totalCount: res_data.count,
                        totalPages: res_data.data.length,
                        currentPate: parseInt(page)
                    }
                },
                message: `${res_data.data.length} fetched`
            }
    
        } catch (error) {
            throw error            
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/fetchDetailsProduct/:product_id')
    async fetchDetailProduct(@Req() req: Request, @Param('product_id') product_id: string){
        const beforeTime: any = new Date()
        const res = await this.productService.getDetailProduct(product_id)
        const afterTime: any = new Date()

        const totalTime = afterTime - beforeTime

        this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

        return {
            res,
            message: `detail product for product_id ${product_id} fetched`
        }
    }
}