import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url/url.service';
import { Response } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly urlService: UrlService) { }

    /**
     * This enpoint accepts the shortend url and redirects the user to the destination url
     * @param shortUrl 
     * @param res 
     * @returns 
     */
    @ApiExcludeEndpoint()
    @Get('/:short_url')
    async getShortUrl(@Param('short_url') shortUrl: string, @Res() res: Response) {
        const destination = await this.urlService.getDestination(shortUrl);

        return res.redirect(destination);
    }
}
