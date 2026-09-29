import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { ProductResponse, ProductDetailsResponse } from '../Model/ProductResponse';

export class ProductApi {

    private apiClient: ApiClient;

    constructor(
        request: APIRequestContext,
        private token: string
    ) {
        this.apiClient = new ApiClient(request);
    }

    async getProducts(): Promise<ProductResponse> {
        const response = await this.apiClient.post(
            '/api/ecom/product/get-all-products',
            {},
            this.token
        );

        return await response.json();
    }

    async getProductDetails(productId: string): Promise<ProductDetailsResponse> {
        const response = await this.apiClient.get(
            `/api/ecom/product/get-product-detail/${productId}`,
            this.token
        );

        return await response.json();
    }
}