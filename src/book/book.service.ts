import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 1. ต้องใช้ตัวนี้คุยกับ DB
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'; // 2. Import Entity เข้ามา

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({
      relations: ['category'], 
    });
  }

 
  findOne(id: string) { 
    return this.bookRepository.findOne({
      where: { id },
      relations: ['category'], 
    });
  }

  async like(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    
    book.likeCount += 1;
    
    return this.bookRepository.save(book);
  }

  update(id: string, updateBookDto: UpdateBookDto) { 
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: string) { 
    return this.bookRepository.delete(id);
  }
}