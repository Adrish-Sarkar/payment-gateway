import { IsString, IsNumber, Min, IsUUID } from 'class-validator';
export class CreateOrderDto {
    @IsUUID('4', { message: 'Invalid product tracking token.' })
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}