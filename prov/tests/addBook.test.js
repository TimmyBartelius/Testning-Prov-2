import { test, expect } from "@playwright/test";

test.describe("Läslistan lägga till böcker", () => {
  //Ladda in sidan före varje test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("lägga till en bok", async ({ page }) => {
    const bookTitle = "The Winter Wars";
    const bookAuthor = "Timmy Bartelius";
    await page.getByTestId("add-book").click();

    // Fyll i formuläret med bokens titel och författare
    await page.getByTestId("add-input-title").fill(bookTitle);
    await page.getByTestId("add-input-author").fill(bookAuthor);

    // Klicka på knappen för att lägga till boken
    await page.getByTestId("add-submit").click();
  });

  test("lägga till och kontrollera att boken finns i katalogen", async ({
    page,
  }) => {
    const bookTitle = "The Winter Wars";
    const bookAuthor = "Timmy Bartelius";
    await page.getByTestId("add-book").click();

    await page.getByTestId("add-input-title").fill(bookTitle);
    await page.getByTestId("add-input-author").fill(bookAuthor);

    await page.getByTestId("add-submit").click();

    // Gå tillbaka till katalogen
    await page.getByTestId("catalog").click();

    //Boken finns i katalogen
    await expect(page.getByText(bookTitle)).toBeVisible();
  });

  test("lägga till samma bok flera gånger", async ({ page }) => {
    const bookTitle = "The Winter Wars";
    const bookAuthor = "Timmy Bartelius";

    await page.getByTestId("add-book").click();

    await page.getByTestId("add-input-title").fill(bookTitle);
    await page.getByTestId("add-input-author").fill(bookAuthor);

    await page.getByTestId("add-submit").click();

    await page.fill('[data-testid="add-input-title"]', bookTitle);
    await page.fill('[data-testid="add-input-author"]', bookAuthor);
    await page.getByTestId("add-submit").click();

    await page.getByTestId("catalog").click();
    await expect(page.getByText(bookTitle)).toHaveCount(2);
  });
});
