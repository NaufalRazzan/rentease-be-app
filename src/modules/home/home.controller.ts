import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Req, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { HomeService } from './home.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { InsertProductsDto } from '../../validations/insert-products.dto';

@Controller()
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/insert')
  @UseInterceptors(AnyFilesInterceptor())
  @UsePipes(new ValidationPipe({ transform: true }))
  async insertData(@Req() req: Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body('body') bodyString: string){
    if (!files || files.length === 0) {
      return { message: 'No files uploaded' };
    }
    const beforeTime: any = new Date()
    const body: InsertProductsDto[] = JSON.parse(bodyString)
    await this.homeService.insertMany(body, files)
    const afterTime: any = new Date()

    const totalTime = afterTime - beforeTime

    this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

    return {
      message: `${files.length} images and ${body.length} data inserted `
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getDataHomePage(@Req() req: Request){
    const beforeTime: any = new Date()
    const result = await this.homeService.getRandomData(1)
    const afterTime: any = new Date()

    const totalTime = afterTime - beforeTime

    this.logger.log(`${req.ip} ${req.method} | ${req.url}: Execution times ${totalTime} ms`)

    return {
      result,
      message: `${result.data.length} fetched`
    }
  }
}
