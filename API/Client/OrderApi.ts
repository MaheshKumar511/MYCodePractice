import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { OrderResponse } from '../Model/OrderResponse';

export type CreateOrderResponse = {
    message: string;
    orders: string[];
};

export class OrderApi {

    private apiClient: ApiClient;

    constructor(request: APIRequestContext, private token: string) {
        this.apiClient = new ApiClient(request);
    }

    async createOrder(country: string, productOrderedId: string): Promise<CreateOrderResponse> {
        const response = await this.apiClient.post('/api/ecom/order/create-order', {
            orders: [{ country, productOrderedId }]
        }, this.token);
        return await response.json();
    }

    async getOrdersForCustomer(userId: string): Promise<OrderResponse> {
        const response = await this.apiClient.get(`/api/ecom/order/get-orders-for-customer/${userId}`, this.token);
        return await response.json();
    }
}