import { test as setup, expect } from "@playwright/test";
import LoginPage from "../../page-objects/bo/login-page";
import DashboardPage from "../../page-objects/bo/dashboard-page";
import {Globals} from "../../utils/globals";


const authFile = ".auth/user.json";

setup("@setup - Authentication", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await page.goto(Globals.bo_url, { waitUntil: "domcontentloaded" });

    if (await loginPage.isConnectWithAnotherMethodLinkVisible()) {
        await loginPage.connectWithAnotherMethod();
    }

    await loginPage.login(
        Globals.account.email,
        Globals.account.password,
        Globals.bo_dashboard_url,
    );
    const title = await dashboardPage.getPageTitle();
    expect(title).toContain(dashboardPage.pageTitle);

    await page.context().storageState({ path: authFile });
});
