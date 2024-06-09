import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PriceValidationPipe implements PipeTransform<string, number>{
    transform(value: string, metadata: ArgumentMetadata): number {
      if(!value) return;
      else if (!/^\d+$/.test(value)) {
        throw new BadRequestException('Invalid price format. Price must be a number.');
      }
      
      const price = parseInt(value);
      if (price < 0) {
        throw new BadRequestException('Price cannot be negative.');
      }
      return price;
    }
}