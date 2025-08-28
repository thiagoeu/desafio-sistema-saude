import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const doc = process.env.DOCUMENTATION || 'http://localhost:3000/api';
    return `Documentação: <a href="${doc}">${doc}</a>`;
  }
}
