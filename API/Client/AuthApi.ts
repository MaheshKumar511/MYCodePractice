import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { AuthResponse } from '../Model/AuthResponse';

export class AuthApi {

    private apiClient: ApiClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async login(userEmail: string, userPassword: string): Promise<AuthResponse> {
        const response = await this.apiClient.post('/api/ecom/auth/login', { userEmail, userPassword });
        return await response.json();
    }
}