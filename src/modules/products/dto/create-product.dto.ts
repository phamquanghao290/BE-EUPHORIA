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
  category: number;

  @IsNotEmpty()
  @IsNumber()
  brand: number;
}
