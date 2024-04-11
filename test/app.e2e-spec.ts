import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /url/shorten (Shorten URL)', async () => {
    const postData = { url: 'https://example.com' };
    const response = await request(app.getHttpServer())
      .post('/url/shorten')
      .send(postData)
      .expect(HttpStatus.CREATED);
    expect(response.body).toHaveProperty('short_url');
  });
});
