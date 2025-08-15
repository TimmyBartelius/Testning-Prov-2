import { test, expect } from "@playwright/test";

test.describe("Navigering mellan sidor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Navigerar mellan sidor och kontrollerar innehåll", async ({ page }) => {
    // Start – kontrollera att vi ser katalogen
    await expect(page.getByRole("heading", { name: "Katalog" })).toBeVisible();

    // Gå till Lägg till bok
    const laggTillBtn = page.getByRole("button", { name: "Lägg till bok" });
    await expect(laggTillBtn).toBeEnabled();
    await laggTillBtn.click();
    await expect(
      page.getByRole("heading", { name: "Lägg till bok" })
    ).toBeVisible();

    // Gå till Mina böcker
    const minaBockerBtn = page.getByRole("button", { name: "Mina böcker" });
    await expect(minaBockerBtn).toBeEnabled();
    await minaBockerBtn.click();
    await expect(
      page.getByRole("heading", { name: "Mina böcker" })
    ).toBeVisible();

    // Tillbaka till katalogen
    const katalogBtn = page.getByRole("button", { name: "Katalog" });
    await expect(katalogBtn).toBeEnabled();
    await katalogBtn.click();
    await expect(page.getByRole("heading", { name: "Katalog" })).toBeVisible();
  });
});
