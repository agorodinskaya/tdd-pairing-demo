import { Menu } from "./Menu";
import { StubPrinter } from "./InputOutput/LinePrinter";
import { Account } from "./Account";
import { StubReader } from "./InputOutput/LineReader";

describe(Menu, () => {
  const ACCOUNT_INITIAL_BALANCE = 9000;

  describe("menuFilterOption", () => {
    let linePrinter: StubPrinter;
    let lineReader: StubReader;
    let account: Account;
    let menu: Menu;

    beforeEach(() => {
      linePrinter = new StubPrinter();
      lineReader = new StubReader();
      account = new Account(linePrinter, ACCOUNT_INITIAL_BALANCE);
      menu = new Menu({ linePrinter, lineReader, account });
    });

    it("should print the current balance when option 1 is selected", () => {
      menu.menuFilterOption("1");

      expect(linePrinter.getPrintedLine(0)).toEqual(
        `Your current balance is: $${ACCOUNT_INITIAL_BALANCE}`
      );
    });

    describe("when option 3 is selected", () => {
      //TODO: Implement deposit functionality
    });

    describe("when option 2 is selected", () => {
      beforeEach(() => {
        lineReader.setLineToRead("400");
        menu.menuFilterOption("2");
      });

      it("should prompt for a deposit amount", () => {
        expect(lineReader.getLastQuestion()).toEqual(
          "Please enter an amount to withdraw: "
        );
      });

      it("should print the new account balance", () => {
        expect(linePrinter.getPrintedLine(0)).toEqual(
          "You have withdrawn $400"
        );
        expect(linePrinter.getPrintedLine(1)).toEqual(
          "Your new account balance is: $8600"
        );
      });

      it("should not procced withdrawal", () => {
        expect(linePrinter.getPrintedLine(0)).toEqual(
          "You have withdrawn $400"
        );
        expect(linePrinter.getPrintedLine(1)).toEqual(
          "Your new account balance is: $8600"
        );
      });
    });

    describe("when option 2 is selected to withdraw amount exceeding account balance", () => {
      beforeEach(() => {
        lineReader.setLineToRead("12000");
        menu.menuFilterOption("2");
      });

      it("should prompt for an amount to withdraw", () => {
        expect(lineReader.getLastQuestion()).toEqual(
          "Please enter an amount to withdraw: "
        );
      });

      it.skip("should not procced with the withdrawal", () => {
        expect(linePrinter.getPrintedLine(0)).toEqual(
          "You can not withdraw amount $12000"
        );
        expect(linePrinter.getPrintedLine(1)).toEqual(
          `Your new account balance is: $${ACCOUNT_INITIAL_BALANCE}`
        );
      });
    });
  });
});
