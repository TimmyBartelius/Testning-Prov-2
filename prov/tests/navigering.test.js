import { test, expect } from "@playwright/test";

test.describe("Läslistan navigering", () => {
  //Ladda in sidan före varje test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });
  //Se till att sidan har titeln "Läslistan", även som rubrik
  test("smoke test att sidan existerar och är hel", async ({ page }) => {
    await expect(page).toHaveTitle(/Läslistan/);
    await expect(page.locator("h1")).toHaveText("Läslistan");
  });
  //Klicka på läslista-knappen och se om sparade böcker är synliga
  test("navigera till alla vyer", async ({ page }) => {
    await page.getByTestId("favorites").click();
    await expect(
      page.getByText(
        "När du valt, kommer dina favoritböcker att visas här." ||
          "Dina favoriter:"
      )
    ).toBeVisible();

    //Klicka på katalogknappen
    await page.getByTestId("catalog").click();

    // Katalogen är synlig
    await expect(
      page.getByText("Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
    ).toBeVisible();

    //Klicka på lägg till bok-knappen
    await page.getByTestId("add-book").click();

    //Lägg till bok-vyn är synlig
    await expect(page.locator("main > div")).toHaveClass("form");
    await expect(page.getByTestId("add-submit")).toBeVisible();
  });
});
