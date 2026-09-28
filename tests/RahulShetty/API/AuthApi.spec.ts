import { test, expect } from '../../../API/ApiTestFixture';

test.describe('Authentication API', () => {

    test('Login Successfully', async ({ api }) => {
        const response = await api.login();

        expect(response.message).toBe('Login Successfully');
        expect(response.token).toBeTruthy();
        expect(response.userId).toBeTruthy();
    });

});