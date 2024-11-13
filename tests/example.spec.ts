import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    const path = require('path');
    const filePath = `file://${path.resolve('html/dummy-order.html')}`;
    await page.goto(filePath);
})

//Lesson 02
//npx playwright test --project=chromium
test('Page has title', async ({page}) => {
    await expect(page.getByTestId('submit-order')).toBeDisabled()
});

test('Check button enabled', async ({page}) => {
    const userNameField = await page.getByTestId('username')
    const emailField = await page.getByTestId('email')
    await userNameField.fill('test')
    await emailField.fill('test@test.com')
    await expect(page.getByTestId("submit-order")).toBeEnabled()
});

test('Check popup', async ({page}) => {
    const userNameField = await page.getByTestId('username')
    const emailField = await page.getByTestId('email')
    const popup = await page.locator('css=#popup-message')
    await userNameField.fill('test')
    await emailField.fill('test@test.com')
    await page.getByTestId("submit-order").click()
    await expect(popup).toBeVisible()
    await expect(popup).toBeEnabled()
});

//Lesson 01
test.skip('has title', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', {name: 'Get started'}).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
});
