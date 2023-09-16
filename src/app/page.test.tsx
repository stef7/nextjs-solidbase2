import { describe, expect, it } from "bun:test";
import { render, screen } from "@/test/utils";
import HomePage from "./page";

describe(HomePage.name, () => {
  it("renders", async () => {
    render(<HomePage />);

    const page = await screen.findByTestId("home page");

    expect(page).toBeTruthy();
  });
});
