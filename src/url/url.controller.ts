import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { UrlDto } from './url.dto';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}
    /**
     * Redirect to destination
     * @param data 
     * @returns 
     */
    @Post('/shorten')
    shortenUrl(@Body() data: UrlDto) {
        // redirect the visitor to the destination url
        return this.urlService.shortenUrl(data);
    }
}
