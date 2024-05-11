// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import Button from "./Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button test", () => {
  test("Test default props", () => {
    render(<Button>Test</Button>);

    // screen.debug();
    const element = screen.getByRole("button", {
      name: /test/i,
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test");
    expect(element).toHaveClass(/md/i, /primary/i, /button/i);
  });

  test("Test custom props", () => {
    render(
      <Button size="sm" variant="outline">
        Test
      </Button>
    );

    const element = screen.getByRole("button", {
      name: /test/i,
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test");
    expect(element).toHaveClass(/sm/i, /outline/i, /button/i);
  });
  test("Test custom props2", () => {
    render(
      <Button size="lg" variant="secondary">
        Test
      </Button>
    );

    const element = screen.getByRole("button", {
      name: /test/i,
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test");
    expect(element).toHaveClass(/lg/i, /secondary/i, /button/i);
  });
  test("Testing click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Test</Button>);

    const element = screen.getByRole("button", {
      name: /test/i,
    });
    await user.click(element);
    await user.click(element);

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
