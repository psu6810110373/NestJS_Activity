import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; //2.2
import { BookCategory } from './entities/book-category.entity'; //2.2

@Module({
  imports : [TypeOrmModule.forFeature([BookCategory])] /*2.2 บอกโมดูลเพื่อให้มันทำงานได้*/ , 
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}
