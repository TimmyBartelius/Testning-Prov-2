import { test, expect } from "@playwright/test";

test.describe("Kollar så min gillade bok finns i min lista", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Kollar så att boken jag gillat syns i listan", async ({ page }) => {
    await page
      .getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
      .click();

    await page.getByTestId("favorites").click();

    const favorit = page.getByTestId(
      "fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
    await expect(favorit).toBeVisible();
    await expect(favorit).toHaveText(
      "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
  });

  test("Visar tom lista när inga böcker är favoriter", async ({ page }) => {
    await page.getByTestId("favorites").click();

    const favoritLista = page.locator('[data-testid="book-list"] li');
    await expect(favoritLista).toHaveCount(0);
  });

  test("Avmarkera favorit i Mina böcker tar bort boken från listan", async ({
    page,
  }) => {
    await page
      .getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
      .click();

    await page.getByTestId("favorites").click();
    await page.getByTestId("catalog").click();

    await page
      .getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
      .click();

    await page.getByTestId("favorites").click();

    const favorit = page.locator(
      '[data-testid="fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"]'
    );
    await expect(favorit).toHaveCount(0);
  });

  test("Favoritvisningen visar korrekt titel", async ({ page }) => {
    await page
      .getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
      .click();

    await page.getByTestId("favorites").click();

    const favorit = page.getByTestId(
      "fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
    await expect(favorit).toContainText(
      "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
  });
});
