import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор книги' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1984', description: 'Название книги' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Джордж Оруэлл', description: 'Автор книги' })
  @Column()
  author: string;

  @ApiProperty({ example: 300, description: 'Цена книги в рублях' })
  @Column()
  price: number;

  @ApiProperty({
    example: 'Роман-антиутопия',
    description: 'Описание книги',
    required: false,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    example: 'https://...',
    description: 'URL изображения обложки',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  image: string | null;
}
