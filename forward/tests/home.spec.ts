import { expect, test } from "@playwright/test";

const widths = [360, 390, 768, 1024, 1440, 1920];

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  test("matches the approved full page", async ({ page }) => {
    await page.goto("/tr/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot("sis-desktop-1440.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("the stone climbs to the summit", async ({ page }) => {
    await page.goto("/tr/");
    await page.evaluate(() => document.fonts.ready);
    const next = page.getByRole("button", { name: "Sonraki hizmet" });
    await next.click();
    await next.click();
    await next.click();

    await expect(page.getByRole("tab", { name: "Özel yazılım" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".pn-climb__map")).toHaveAttribute("aria-label", "Taş zirvede, yıldızlar yandı");
    await expect(page.locator(".pn-climb__stars")).toHaveCSS("opacity", "1");
    await expect(next).toBeDisabled();
    await expect(page.locator(".pn-climb")).toHaveScreenshot("sis-desktop-1440-services-summit.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("arrow key moves the selected service", async ({ page }) => {
    await page.goto("/tr/");
    const agents = page.getByRole("tab", { name: "AI ajanları" });
    await agents.focus();
    await page.keyboard.press("ArrowRight");
    const solutions = page.getByRole("tab", { name: "AI çözümleri" });
    await expect(solutions).toHaveAttribute("aria-selected", "true");
    await expect(solutions).toBeFocused();
    await expect(page.locator(".pn-climb__map")).toHaveAttribute("aria-label", "Taş omuzda");
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

  test("matches the approved full page", async ({ page }) => {
    await page.goto("/tr/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot("sis-mobile-390.png", {
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.01,
    });
  });
});

test("no horizontal overflow", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/tr/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `overflow at ${width}`).toBe(0);
  }
});
