import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PaymentModule } from '../payment/payment.module';

@Module({
    imports: [
        // Registering our Dynamic Module and passing configuration options
        PaymentModule.register({
            provider: 'stripe', // Try switching this to 'paypal' later!
            apiKey: 'sk_test_51NxPRODUCTION_KEY_SECRET',
        }),
    ],
    controllers: [OrderController],
})
export class OrdersModule { }