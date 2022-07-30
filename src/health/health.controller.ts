import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheck,
	TypeOrmHealthIndicator,
	DiskHealthIndicator,
	MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private db: TypeOrmHealthIndicator,
		private disk: DiskHealthIndicator,
		private memory: MemoryHealthIndicator,
	) {}

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
			() => this.db.pingCheck('database'),
			() =>
				this.disk.checkStorage('storage', {
					path: '/',
					thresholdPercent: 0.5,
				}),
			() => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
		]);
	}
}
