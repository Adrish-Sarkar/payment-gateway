import { Controller, Post, Body, Param, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ParseUUIDPipe } from '../../common/pipes/parse-uuid.pipe';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from '../../common/filters/exception/http-exception.filter';

@Controller('orders')
@UseFilters(GlobalExceptionFilter) // Catches all errors thrown in this controller
@UseInterceptors(LoggingInterceptor) // Measures performance of these endpoints
export class OrderController {

    @Post(':tenantId')
    @Roles('admin', 'premium-buyer')
    @UseGuards(RolesGuard)
    async createOrder(
        @Param('tenantId', ParseUUIDPipe) tenantId: string, // Custom validation/transformation pipe
        @Body() createOrderDto: CreateOrderDto // Class validation pipe kicks in automatically
    ) {
        return {
            status: 'success',
            tenantId,
            data: createOrderDto,
        };
    }
}