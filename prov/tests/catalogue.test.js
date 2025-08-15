import { test, expect } from "@playwright/test";

test.describe("Katalogvyn - navigering och favoritmarkering", () => {
  test.beforeEach(async ({ page }) => {
    // Bara ladda sidan, men hoppa över att klicka på 'Katalog'-knappen
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Katalogvyn visar minst en bok", async ({ page }) => {
    // Leta efter minst ett bokelement i katalogen
    const books = page.locator("[data-testid^='star-']");
    await expect(books.first()).toBeVisible();
  });

  test("Gilla och ogilla första boken i katalogen", async ({ page }) => {
    // Hämta titeln på första boken i katalogen dynamiskt
    const firstBook = page.locator("[data-testid^='star-']").first();
    const titleAttr = await firstBook.getAttribute("data-testid");
    const title = titleAttr?.replace("star-", "") || "";

    // Klicka för att markera favorit
    await firstBook.click();
    await expect(firstBook).toHaveClass(/selected/);

    // Klicka igen för att avmarkera
    await firstBook.click();
    await expect(firstBook).not.toHaveClass(/selected/);
  });
});
