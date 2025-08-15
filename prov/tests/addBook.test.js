import { test, expect } from "@playwright/test";

test.describe("Lägga till en bok och se den i katalog och Mina böcker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Lägger till en ny bok och kontrollerar att den visas korrekt", async ({
    page,
  }) => {
    // Vänta in och klicka på "Lägg till bok"
    const laggTillBokBtn = page.getByRole("button", { name: "Lägg till bok" });
    await expect(laggTillBokBtn).toBeEnabled();
    await laggTillBokBtn.click();

    // Vänta på att titel-fältet finns
    const titelInput = page.getByTestId("add-input-title");
    await expect(titelInput).toBeVisible();
    await titelInput.fill("The Winter Wars");

    const forfattareInput = page.getByTestId("add-input-author");
    await expect(forfattareInput).toBeVisible();
    await forfattareInput.fill("T. Bartelius");

    // Kontrollera att värdena är rätt
    await expect(titelInput).toHaveValue("The Winter Wars");
    await expect(forfattareInput).toHaveValue("T. Bartelius");

    // Klicka på "Lägg till ny bok"
    const addBtn = page.getByRole("button", { name: "Lägg till ny bok" });
    await expect(addBtn).toBeEnabled();
    await addBtn.click();

    // Kontrollera att kataloglistan har fått minst 1 bok
    const catalogueItems = page.getByTestId("catalogue-list").locator("li");
    await expect(catalogueItems)
      .toHaveCountGreaterThan(0)
      .catch(async () => {
        // fallback om toHaveCountGreaterThan saknas
        const count = await catalogueItems.count();
        expect(count).toBeGreaterThan(0);
      });

    // Navigera till katalogen
    const katalogBtn = page.getByRole("button", { name: "Katalog" });
    await expect(katalogBtn).toBeEnabled();
    await katalogBtn.click();

    // Kontrollera att boken och författaren syns
    await expect(page.getByText("The Winter Wars").first()).toBeVisible();
    await expect(page.getByText("T. Bartelius")).toBeVisible();

    // Markera som favorit
    const favBtn = page.getByTestId("star-The Winter Wars");
    await expect(favBtn).toBeVisible();
    await favBtn.click();

    // Navigera till Mina böcker
    const minaBockerBtn = page.getByRole("button", { name: "Mina böcker" });
    await expect(minaBockerBtn).toBeEnabled();
    await minaBockerBtn.click();

    // Kontrollera att favoriten syns
    await expect(page.getByText("The Winter Wars")).toBeVisible();
  });
});
