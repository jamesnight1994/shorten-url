import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MD5Utils from './MD5Utils';
import { UrlDto } from './url.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
    constructor(private prismaService: PrismaService) { }
    /**
   * Get the destination of the short url provided
   * 
   * @param shortUrl 
   * @returns 
   */
    async getDestination(shortUrl: string): Promise<string> {
        // get short url destination
        const url = await this.prismaService.url.findFirst({
            where: {
                short_url: shortUrl
            }
        });
        const destination = url.destination;

        return destination;
    }

    /**
     * Shorten the url passed
     * @param data 
     * @returns 
     */
    async shortenUrl(data: UrlDto) {
        try {
            // generate short url
            const short_url = MD5Utils.generateRandomShortUrl(data.url);
            const domain = process.env.APP_DOMAIN || 'http://localhost:3000';

            // Check if the link is valid
            if (!data.url.startsWith('http://') && !data.url.startsWith('https://')) {
                throw new HttpException('Invalid URL format', HttpStatus.BAD_REQUEST);
            }

            // check if the destination/url submitted exists 
            const url = await this.prismaService.url.findFirst({
                where: {
                    destination: data.url
                }
            });

            if (!url) {
                // if not found in records, store short url and destination 
                await this.prismaService.url.create({
                    data: {
                        destination: data.url,
                        short_url
                    }
                });

            }

            // return the host+path
            return `${domain}/${short_url}`
        } catch (error) {
            console.error(error.message);
            return error.message
        }

    }
}
