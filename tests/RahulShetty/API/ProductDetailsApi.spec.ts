import { test, expect } from '../../../API/ApiTestFixture';

test.describe('Product Details API', () => {

    test('Get Product Details', async ({ api }) => {
        await api.login();

        const response = await api.productApi.getProductDetails('6960eae1c941646b7a8b3ed3');

        expect(response.message).toBe('Product Details fetched Successfully');
        expect(response.data._id).toBe('6960eae1c941646b7a8b3ed3');
        expect(response.data.productName).toBe('ADIDAS ORIGINAL');
        expect(response.data.productPrice).toBe(11500);
        expect(response.data.productCategory).toBe('electronics');
        expect(response.data.productSubCategory).toBe('mobiles');
        expect(response.data.productDescription).toBe('Apple phone');
    });

});