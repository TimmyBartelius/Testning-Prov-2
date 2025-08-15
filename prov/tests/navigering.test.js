import { test, expect } from "@playwright/test";

test.describe("Navigering mellan sidorna", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Kan navigera mellan Lägg till bok, Katalog och Mina böcker", async ({
    page,
  }) => {
    // Navigera till Lägg till bok
    await expect(
      page.getByRole("button", { name: "Lägg till bok" })
    ).toBeEnabled();
    await page.getByRole("button", { name: "Lägg till bok" }).click();
    await expect(
      page.getByRole("heading", { name: "Lägg till bok" })
    ).toBeVisible();

    // Navigera till Katalog
    await expect(page.getByRole("button", { name: "Katalog" })).toBeEnabled();
    await page.getByRole("button", { name: "Katalog" }).click();
    await expect(page.getByRole("heading", { name: "Katalog" })).toBeVisible();

    // Navigera till Mina böcker
    await expect(
      page.getByRole("button", { name: "Mina böcker" })
    ).toBeEnabled();
    await page.getByRole("button", { name: "Mina böcker" }).click();
    await expect(
      page.getByRole("heading", { name: "Mina böcker" })
    ).toBeVisible();
  });
});
