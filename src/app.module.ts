import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { BookCategoryModule } from './book-category/book-category.module';
import { BookCategory } from './book-category/entities/book-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      entities: [BookCategory],
      synchronize: true,
    }),
    BookCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
