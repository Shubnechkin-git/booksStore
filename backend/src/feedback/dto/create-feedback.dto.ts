import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @ApiProperty({ example: 'Иван Иванов', description: 'Имя отправителя' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @ApiProperty({
    example: 'ivan@example.com',
    description: 'Email отправителя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({
    example: 'Здравствуйте, хочу оставить отзыв...',
    description: 'Сообщение обратной связи',
  })
  @IsString({ message: 'Сообщение должно быть строкой' })
  @IsNotEmpty({ message: 'Сообщение не должно быть пустым' })
  message: string;
}
