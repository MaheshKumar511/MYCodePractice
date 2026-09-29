import { APIRequestContext } from '@playwright/test';
import { AuthApi } from './Client/AuthApi';
import { OrderApi } from './Client/OrderApi';
import { ProductApi } from './Client/ProductApi';

export class ApiFixture {

    private _authApi?: AuthApi | null;
    private _productApi?: ProductApi | null;
    private _orderApi?: OrderApi | null;
    private _token?: string;

    constructor(private request: APIRequestContext) { }

    get authApi(): AuthApi {
        if (!this._authApi) {
            this._authApi = new AuthApi(this.request);
        }
        return this._authApi;
    }

    async login() {
        const response = await this.authApi.login(
            process.env.USER_EMAIL!,
            process.env.USER_PASSWORD!
        );

        this._token = response.token;

        return response;
    }

    get productApi(): ProductApi {
        if (!this._token) {
            throw new Error('API login required');
        }

        if (!this._productApi) {
            this._productApi = new ProductApi(this.request, this._token);
        }

        return this._productApi;
    }

    get orderApi(): OrderApi {
        if (!this._token) {
            throw new Error('API login required');
        }

        if (!this._orderApi) {
            this._orderApi = new OrderApi(this.request, this._token);
        }

        return this._orderApi;
    }
}