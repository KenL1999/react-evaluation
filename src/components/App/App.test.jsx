// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App test", () => {
  test("verifying correct render", () => {
    render(<App />);

    screen.debug();
    const element = screen.getByRole("heading", {
      name: /react evaluation/i,
    });
    const element2 = screen.getAllByRole("button", { name: /color game/i });

    const element3 = screen.getAllByRole("button", { name: /doable/i });

    expect(element).toHaveTextContent("React Evaluation");
    expect(element).toBeInTheDocument();
    expect(element2[0]).toBeInTheDocument();
    expect(element3[0]).toBeInTheDocument();
    expect(element2[1]).toBeInTheDocument();
    expect(element3[1]).toBeInTheDocument();
  });
  test("verifying navigation to Color game", async () => {
    const user = userEvent.setup();
    render(<App />);

    const element2 = screen.getAllByRole("button", { name: /color game/i });

    const element3 = screen.getAllByRole("button", { name: /doable/i });

    await user.click(element2[0]);

    const element4 = screen.getByRole("heading", {
      name: /color game/i,
    });

    expect(element2[0]).toBeInTheDocument();
    expect(element3[0]).toBeInTheDocument();
    expect(element2[1]).not.toBeInTheDocument();
    expect(element3[1]).not.toBeInTheDocument();
    expect(element4).toBeInTheDocument();
  });
  test("verifying navigation to Doable", async () => {
    const user = userEvent.setup();
    render(<App />);

    const element2 = screen.getAllByRole("button", { name: /color game/i });

    const element3 = screen.getAllByRole("button", { name: /doable/i });

    await user.click(element3[0]);

    const element4 = screen.getByRole("heading", {
      name: /Doable/i,
    });

    expect(element2[0]).toBeInTheDocument();
    expect(element3[0]).toBeInTheDocument();
    expect(element2[1]).not.toBeInTheDocument();
    expect(element3[1]).not.toBeInTheDocument();
    expect(element4).toBeInTheDocument();
  });
});
