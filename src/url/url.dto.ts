import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class UrlDto {
  @ApiProperty({ description: 'The URL to be shortened', default:"https://example.com"})
  @IsUrl({}, { message: 'Invalid URL format' })
  url: string;
}
