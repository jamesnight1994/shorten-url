import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  exports:[UrlService],
  providers: [PrismaService,UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
