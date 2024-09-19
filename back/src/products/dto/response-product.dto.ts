
export class ProductResponseDto {
  id: string;

  creator: string;

  type: string;

  title: string;

  description: string;

  price: number;

  stock: number;

  images: string[];

  createDate: Date;

  status: string;
}