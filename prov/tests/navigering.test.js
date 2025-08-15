import { test, expect } from "@playwright/test";

test.describe("Navigeringen och vyer", () => {
  // Körs innan varje test
  test.beforeEach(async ({ page }) => {
    // Öppnar startsidan av appen
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  // Kontrollerar att sidans titel är korrekt
  test('Visar sidans titel "Läslistan"', async ({ page }) => {
    // Väntar och verifierar att webbsidans titel matchar "Läslistan"
    await expect(page).toHaveTitle("Läslistan");
  });

  // Kontrollerar att startsidans huvudknappar är synliga
  test('Visar startsidans knappar "Katalog", "Lägg till bok" och "Mina böcker"', async ({
    page,
  }) => {
    // Verifierar att knappen för Katalog finns och syns
    await expect(page.getByRole("button", { name: "Katalog" })).toBeVisible();

    // Verifierar att knappen för Lägg till bok finns och syns
    await expect(
      page.getByRole("button", { name: "Lägg till bok" })
    ).toBeVisible();

    // Verifierar att knappen för Mina böcker finns och syns
    await expect(
      page.getByRole("button", { name: "Mina böcker" })
    ).toBeVisible();
  });

  // Navigerar till katalogvyn och kontrollerar att minst en bok visas
  test("Navigerar till katalogvyn och visar minst en bok", async ({ page }) => {
    // Klickar på "Katalog"-knappen för att visa katalogen
    await page.getByRole("button", { name: "Katalog" }).click();

    // Hämtar listan med alla böcker i katalogen
    const books = page.locator('[data-testid="book-list"] li');

    // Verifierar att det finns minst en bok i listan
    await expect(books).toHaveCountGreaterThan(0);
  });

  // Navigerar till "Lägg till bok" och kontrollerar att formuläret är synligt
  test('Navigerar till "Lägg till bok" och visar formulär med titel, författare och knapp', async ({
    page,
  }) => {
    // Klickar på knappen "Lägg till bok"
    await page.getByRole("button", { name: "Lägg till bok" }).click();

    // Kontrollerar att inputfältet för titel finns
    await expect(page.getByLabel("Titel")).toBeVisible();

    // Kontrollerar att inputfältet för författare finns
    await expect(page.getByLabel("Författare")).toBeVisible();

    // Kontrollerar att knappen "Lägg till" finns
    await expect(page.getByRole("button", { name: "Lägg till" })).toBeVisible();
  });

  // Navigerar till "Mina böcker" och verifierar att listan är tom när inga favoriter finns
  test('Navigerar till "Mina böcker" och visar tom lista när inga favoriter finns', async ({
    page,
  }) => {
    // Klickar på knappen "Mina böcker"
    await page.getByRole("button", { name: "Mina böcker" }).click();

    // Hämtar listan med favoriter
    const favBooks = page.locator('[data-testid="book-list"] li');

    // Verifierar att listan är tom (count = 0)
    await expect(favBooks).toHaveCount(0);
  });
});
