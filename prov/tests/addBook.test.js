import { test, expect } from "@playwright/test";

test.describe("Lägga till en bok och se den i katalog och Mina böcker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Lägger till en ny bok och kontrollerar att den visas korrekt", async ({
    page,
  }) => {
    // Navigerar till "Lägg till bok"
    await page.getByRole("button", { name: "Lägg till bok" }).click();

    // Fyller i titel och författare
    await page.getByTestId("add-input-title").fill("The Winter Wars");
    await page.getByTestId("add-input-author").fill("T.Bartelius");

    // Verifierar fälten, så de stämmer överens med författare och titel
    await expect(page.getByTestId("add-input-title")).toHaveValue(
      "The Winter Wars"
    );
    await expect(page.getByTestId("add-input-author")).toHaveValue(
      "T.Bartelius"
    );

    // Klickar på "Lägg till ny bok"
    await page.getByRole("button", { name: "Lägg till ny bok" }).click();

    //Det finns minst en bok i katalogen
    await expect(
      page.getByTestId("catalogue-list").locator("li")
    ).toHaveCountGreaterThan(0);

    // Navigerar till katalogen
    await page.getByRole("button", { name: "Katalog" }).click();

    // Kontrollerar att boken och författaren syns i katalogen, efter det går vi till "Mina Böcker"
    const bokElement = page.getByText("The Winter Wars").first();
    await expect(bokElement).toBeVisible();
    await expect(page.getByText("T.Bartelius")).toBeVisible();

    // Klickar på favoritknappen för boken (hjärtat)
    await expect(page.getByTestId("star-The Winter Wars")).toBeVisible();
    await page.getByTestId("star-The Winter Wars").click();

    // Navigerar till "Mina böcker"
    await page.getByRole("button", { name: "Mina böcker" }).click();

    // Kontrollerar att boken finns i favoritlistan (titeln)
    const favorit = page.getByTestId("fav-The Winter Wars");
    await expect(favorit).toBeVisible();
    await expect(favorit).toHaveText("The Winter Wars");

    //  Vi kollar inte författaren här då den inte finns i favoritlistan, den finns på katalogen.
  });
});
