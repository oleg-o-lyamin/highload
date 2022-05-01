import { Body, Controller, Get, Header, Post } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

@Controller('news')
export class NewsController {
  private cache: { last: number, news: PeaceOfNews[] | null } = { last: 0, news: null };

  @Get()
  async getNews() {
    return new Promise(resolve => {
      if (this.cache.last && this.cache.news && (Date.now() - this.cache.last < 10000)) {
        console.log(`Fetching cache, timestamp ${this.cache.last}`)
        setTimeout(() => {
          resolve(this.cache.news)
        }, 100)
      }
      else {
        console.log('New news')
        const news = Object.keys([...Array(20)])
          .map(key => Number(key) + 1)
          .map(n => ({
            id: n,
            title: `Важная новость ${n}`,
            description: (rand => ([...Array(rand(1000))].map(() => rand(10 ** 16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
            createdAt: Date.now()
          }))

        this.cache.last = Date.now()
        this.cache.news = news

        setTimeout(() => {
          resolve(news);
        }, 100)
      }
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
      }, 100)
    });
  }
}
