import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {

    constructor(private request: APIRequestContext) { }

    async get(endpoint: string, token?: string) {
        const response = await this.request.get(endpoint, {
            headers: token ? { Authorization: token } : {}
        });

        expect(response.ok()).toBeTruthy();

        return response;
    }

    async post(endpoint: string, data: object, token?: string) {
        const response = await this.request.post(endpoint, {
            data,
            headers: token ? { Authorization: token } : {}
        });

        expect(response.ok()).toBeTruthy();

        return response;
    }

    async put(endpoint: string, data: object, token?: string) {
        const response = await this.request.put(endpoint, {
            data,
            headers: token ? { Authorization: token } : {}
        });

        expect(response.ok()).toBeTruthy();

        return response;
    }

    async delete(endpoint: string, token?: string) {
        const response = await this.request.delete(endpoint, {
            headers: token ? { Authorization: token } : {}
        });

        expect(response.ok()).toBeTruthy();

        return response;
    }
}