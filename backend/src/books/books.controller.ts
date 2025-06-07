import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@ApiTags('books') // Группа в Swagger UI
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех книг' })
  @ApiResponse({ status: 200, description: 'Список книг', type: [Book] })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить книгу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID книги' })
  @ApiResponse({ status: 200, description: 'Книга найдена', type: Book })
  @ApiResponse({ status: 404, description: 'Книга не найдена' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Книга с id=${id} не найдена`);
    }
    return book;
  }
}
