import { test, expect } from '../../../API/ApiTestFixture';

test.describe('Order API', () => {

    test('Create Order Successfully', async ({ api }) => {
        await api.login();

        const response = await api.orderApi.createOrder(
            'India',
            '6960eae1c941646b7a8b3ed3'
        );

        expect(response.message).toBe('Order Placed Successfully');
        expect(response.orders.length).toBeGreaterThan(0);
        expect(response.orders[0]).toBeTruthy();
    });

    test('Get Orders For Customer Successfully', async ({ api }) => {
        const loginResponse = await api.login();

        const response = await api.orderApi.getOrdersForCustomer(loginResponse.userId);

        expect(response.message).toBe('Orders fetched for customer Successfully');
        expect(response.count).toBeGreaterThan(0);
        expect(response.data.length).toBe(response.count);
        expect(response.data[0].productName).toBeTruthy();
        expect(response.data[0].orderPrice).toBeTruthy();
    });

});