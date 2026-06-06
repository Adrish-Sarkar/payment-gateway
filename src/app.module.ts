import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/order/order.module';

@Module({
  imports: [OrdersModule], // Main feature entry point
  controllers: [],
  providers: [],
})
export class AppModule { }