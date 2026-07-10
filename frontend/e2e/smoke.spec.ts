import { test, expect } from "@playwright/test";

/**
 * Smoke tests — verifies that the key public pages load and contain
 * the expected content, and that navigation works.
 * These run against a real Next.js server (started by playwright.config.ts).
 */

test.describe("Public pages", () => {

  test("home page loads and shows hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Leo Club/i);
    // Hero headline
    await expect(page.getByRole("heading", { name: /Lead\. Serve\. Inspire\./i })).toBeVisible();
    // Navbar is present
    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About/i);
    await expect(page.getByRole("heading", { name: /About Us/i })).toBeVisible();
  });

  test("events page loads and shows category filters", async ({ page }) => {
    await page.goto("/events");
    await expect(page).toHaveTitle(/Events/i);
    await expect(page.getByRole("button", { name: /All/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Health/i })).toBeVisible();
  });

  test("team page loads and lists members", async ({ page }) => {
    await page.goto("/team");
    await expect(page).toHaveTitle(/Team/i);
    await expect(page.getByText(/LEO Smriti Karki/i)).toBeVisible();
  });

  test("gallery page loads with filter buttons", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page).toHaveTitle(/Gallery/i);
    await expect(page.getByRole("button", { name: /All/i })).toBeVisible();
  });

  test("contact page loads and shows form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/i);
    await expect(page.getByRole("textbox", { name: /full name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
    await expect(page.getByRole("button",  { name: /send message/i })).toBeVisible();
  });

  test("404 page shows not-found content", async ({ page }) => {
    await page.goto("/page-that-does-not-exist");
    await expect(page.getByRole("heading", { name: /Page Not Found/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to Home/i })).toBeVisible();
  });

  test("contact form shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible();
  });

  test("footer shows social links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: /facebook/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /instagram/i })).toBeVisible();
  });
});

test.describe("Admin pages", () => {

  test("admin login page loads", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /Welcome Back/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
  });

  test("admin dashboard redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/admin");
    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
