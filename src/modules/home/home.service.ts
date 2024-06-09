import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { InsertProductsDto } from '../../validations/insert-products.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { v4 } from 'uuid';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        
        private readonly httpService: HttpService
    ){}

    async insertMany(payloads: InsertProductsDto[], files: Array<Express.Multer.File>){
        // get image name
        let res: AxiosResponse

        console.log('ex: ', files[0])
        for(let i = 0; i < payloads.length; i++){
            try {
                let body = new FormData()
                body.set('key', process.env.IMGBB_API_KEY)
                body.append('image', files[i].buffer.toString('base64'))
                res = await firstValueFrom(
                    this.httpService.post(
                        process.env.IMGBB_BASE_URI,
                        body
                    )
                );
            } catch (error) {
                if(error instanceof AxiosError){
                    throw new HttpException(error.message, error.status)
                }
                console.error(error)
                throw error
                // else throw error
            }
            payloads[i].img_path = res.data?.data?.id + '/' + files[i].originalname
        }

        // insert to db
        const data =  this.productRepository.create(payloads)

        return await this.productRepository.insert(data)
    }

    async getRandomData(page: number, pageSize: number = 12){
        const totalCount = await this.productRepository.count()
        const totalPages = Math.ceil(totalCount / pageSize)
        const randomIndex = Math.floor(Math.random() * totalCount)
        const data = await this.productRepository.find({
            take: pageSize,
            skip: randomIndex
        });

        return {
            data,
            pagination: {
                totalCount,
                totalPages,
                currentPage: page
            }
        }
    }
}
