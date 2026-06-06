import { Module, DynamicModule, Provider } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PayPalService } from './paypal.service';

export interface PaymentOptions {
    provider: 'stripe' | 'paypal';
    apiKey: string;
}

@Module({})
export class PaymentModule {
    static register(options: PaymentOptions): DynamicModule {
        // 1. Define the custom provider dynamically using a factory
        const paymentServiceProvider: Provider = {
            provide: 'PAYMENT_SERVICE',
            useFactory: () => {
                if (options.provider === 'stripe') {
                    return new StripeService(options.apiKey);
                }
                return new PayPalService(options.apiKey);
            },
        };

        return {
            module: PaymentModule,
            providers: [paymentServiceProvider],
            exports: [paymentServiceProvider], // Must export to make it available to other modules
        };
    }
}