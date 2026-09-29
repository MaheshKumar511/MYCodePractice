import { test } from '../../costomFixture/MaheshCostomfixture';
import { ExcelUtils } from '../../utils/excelUtils';
import path from 'path';

const filePath = path.join(process.cwd(), 'testData', 'TestData.xlsx');
const testData = ExcelUtils.readExcel(filePath, 'testData');

test.describe('Rahul Shetty - Place Order', { tag: '@RahulShetty' }, () => {

    for (const [index, data] of testData.entries()) {
        test(`Place Order Successfully - Test Data ${index + 1}`, async ({ maheshCosomfixture, page }) => {

            const email = process.env.USER_EMAIL!;
            const password = process.env.USER_PASSWORD!;
            const cvv = String(data.cvv);
            const name = data.name;

            await test.step('Login Page', async () => {
                await maheshCosomfixture.RahulShetty.loginPage.navigate();
                await maheshCosomfixture.RahulShetty.loginPage.enterEmail(email);
                await maheshCosomfixture.RahulShetty.loginPage.enterPassword(password);
                await maheshCosomfixture.RahulShetty.loginPage.clickLogin('Login Successfully');
                await maheshCosomfixture.RahulShetty.loginPage.validateUrl('/dashboard');
                await maheshCosomfixture.RahulShetty.loginPage.validateToastMessage('Login Successfully');
            });

            await test.step('Dashboard Page', async () => {
                await maheshCosomfixture.RahulShetty.dashboardPage.clickFirstProduct();
                await maheshCosomfixture.RahulShetty.dashboardPage.addToCart();
                await maheshCosomfixture.RahulShetty.dashboardPage.validateToastMessage('Product Added To Cart');
                await maheshCosomfixture.RahulShetty.dashboardPage.goToCart();
            });

            await test.step('Cart Page', async () => {
                //await maheshCosomfixture.RahulShetty.cartPage.verifyCartPrice1();
                //await maheshCosomfixture.RahulShetty.cartPage.verifyCartPrice2();
                await maheshCosomfixture.RahulShetty.cartPage.getProductID();
                await maheshCosomfixture.RahulShetty.cartPage.checkout();
            });

            await test.step('Checkout Page', async () => {
                await maheshCosomfixture.RahulShetty.checkoutPage.selectExpiry();
                await maheshCosomfixture.RahulShetty.checkoutPage.enterCVV(cvv);
                await maheshCosomfixture.RahulShetty.checkoutPage.enterCardHolderName(name);
                await maheshCosomfixture.RahulShetty.checkoutPage.enterCountry('India');
                await maheshCosomfixture.RahulShetty.checkoutPage.selectCountry('India');
                await maheshCosomfixture.RahulShetty.checkoutPage.placeOrder();
            });

            await test.step('Confirmation Page', async () => {
                await maheshCosomfixture.RahulShetty.confirmationPage.validateToastMessage('Order Placed Successfully');
                await maheshCosomfixture.RahulShetty.confirmationPage.verifyOrderAmount();
            });
        });
    }
});