import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
    constructor(private readonly apiKey: string) { }

    async process(amount: number): Promise<string> {
        console.log(`[Stripe] Processing $${amount} with API Key: ${this.apiKey.substring(0, 8)}...`);
        return `stripe_tx_${Math.random().toString(36).substr(2, 9)}`;
    }
}