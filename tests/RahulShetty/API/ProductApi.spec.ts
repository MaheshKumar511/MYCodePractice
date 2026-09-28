import { test, expect } from '../../../API/ApiTestFixture';

test.describe('Product API', () => {

    test('Get All Products', async ({ api }) => {
        await api.login();

        const response = await api.productApi.getProducts();

        expect(response.message).toBe('All Products fetched Successfully');
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0].productName).toBeTruthy();
        expect(response.data[0].productPrice).toBeGreaterThan(0);
    });

});