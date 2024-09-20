import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';

import { ProductsService } from '../../products/products.service';

@Injectable()
export class ExistingProductGuard implements CanActivate {
  constructor(private readonly prodSv: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const prodId = request.params.id;

    try {
      //const product = await this.prodSv.getProductById(prodId);
      const product = await this.prodSv.findOne(prodId);
      if (!product) {
        throw new NotFoundError('product not found');
      }
      return true;
    } catch {
      throw new BadRequestException('error');
    }
  }
}
