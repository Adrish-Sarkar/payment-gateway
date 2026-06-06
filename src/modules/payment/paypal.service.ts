import { Injectable } from '@nestjs/common';

@Injectable()
export class PayPalService {
    constructor(private readonly apiKey: string) { }

    async process(amount: number): Promise<string> {
        console.log(`[PayPal] Processing $${amount} with API Key: ${this.apiKey.substring(0, 8)}...`);
        return `paypal_tx_${Math.random().toString(36).substr(2, 9)}`;
    }
}