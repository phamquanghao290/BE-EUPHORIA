import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nameProduct: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsEmpty()
  @IsNumber()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  brand_id: number;
}
