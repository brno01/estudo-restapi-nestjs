import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: 'INIT | Retorna o Hello World',
    })
    @ApiResponse({
        status: 200,
        description: 'Hello World',
        type: String,
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
