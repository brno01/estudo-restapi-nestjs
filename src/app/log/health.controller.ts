import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Retorna o status do servidor',
    })
    @ApiResponse({
        status: 200,
        description: 'Status do servidor',
        type: HealthCheck,
    })
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
            () => this.db.pingCheck('Cyan Database Echo:', { timeout: 1000 }),
            () => this.memory.checkHeap('Overload: NO!', 128 * 1024 * 1024),
        ]);
    }
}
