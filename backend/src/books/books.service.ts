import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book | undefined> {
    const book = await this.booksRepository.findOneBy({ id });
    return book ?? undefined;
  }

  async onModuleInit() {
    const count = await this.booksRepository.count();
    if (count === 0) {
      Logger.log('Загрузка тестовых данных в таблицу Books...');
      await this.booksRepository.save([
        {
          title: 'Война и мир',
          author: 'Лев Толстой',
          price: 1200,
          description: 'Эпический роман о России и Наполеоновских войнах.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/1974877/492710367/S600xU_2x',
        },
        {
          title: 'Преступление и наказание',
          author: 'Фёдор Достоевский',
          price: 900,
          description:
            'Психологический роман о преступлении и внутренней борьбе.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/2040540/483113409/S600xU_2x',
        },
        {
          title: 'Мастер и Маргарита',
          author: 'Михаил Булгаков',
          price: 1100,
          description: 'Мистика, философия и сатира в Москве 30-х годов.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/7980979/987862815/S600xU_2x',
        },
        {
          title: 'Гарри Поттер и философский камень',
          author: 'Дж. К. Роулинг',
          price: 1500,
          description: 'Приключения мальчика-волшебника в школе магии.',
          image:
            'https://avatars.mds.yandex.net/get-ott/200035/2a0000017e127a4bd76a12fe709fb640eaa6/orig',
        },
        {
          title: '1984',
          author: 'Джордж Оруэлл',
          price: 950,
          description: 'Антиутопия о тоталитарном обществе будущего.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/2038203/478092060/S600xU_2x',
        },
        {
          title: 'Анна Каренина',
          author: 'Лев Толстой',
          price: 1300,
          description:
            'Трагическая история любви и общества в России XIX века.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/1987348/483013438/S600xU_2x',
        },
        {
          title: 'Отцы и дети',
          author: 'Иван Тургенев',
          price: 850,
          description: 'Конфликт поколений и философские размышления.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/2304191/483042484/S600xU_2x',
        },
        {
          title: 'Дон Кихот',
          author: 'Мигель де Сервантес',
          price: 1200,
          description:
            'Классика мировой литературы о рыцаре и его приключениях.',
          image: null,
        },
        {
          title: 'Улисс',
          author: 'Джеймс Джойс',
          price: 1400,
          description: 'Модернистский роман о жизни и сознании.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/931219/336257604/S600xU_2x',
        },
        {
          title: 'Прекрасный новый мир',
          author: 'Олдос Хаксли',
          price: 980,
          description: 'Антиутопия о будущем обществе потребления и контроля.',
          image: null,
        },
        {
          title: 'Братья Карамазовы',
          author: 'Фёдор Достоевский',
          price: 1250,
          description: 'Философский роман о вере, сомнении и нравственности.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/2238866/483025025/S600xU_2x',
        },
        {
          title: 'Моби Дик',
          author: 'Герман Мелвилл',
          price: 1150,
          description: 'Эпическая история охоты на гигантского белого кита.',
          image: null,
        },
        {
          title: 'Сто лет одиночества',
          author: 'Габриэль Гарсия Маркес',
          price: 1350,
          description:
            'Магический реализм и семейная сага в Латинской Америке.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/1879189/483113363/S600xU_2x',
        },
        {
          title: 'Грозовой перевал',
          author: 'Эмили Бронте',
          price: 900,
          description: 'Трагическая история любви и мести на английском йорке.',
          image:
            'https://avatars.mds.yandex.net/get-entity_search/1948726/483042547/S600xU_2x',
        },
        {
          title: 'Лолита',
          author: 'Владимир Набоков',
          price: 1100,
          description: 'Скандальный роман о любви и одержимости.',
          image: null,
        },
      ]);
      Logger.log('Тестовые книги успешно загружены');
    }
  }
}
