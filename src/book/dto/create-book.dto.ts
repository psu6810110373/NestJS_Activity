import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  price: number;

  @IsUUID() // บังคับว่าต้องส่งรหัสหมวดหมู่มาเป็น UUID เท่านั้น
  categoryId: string;
}