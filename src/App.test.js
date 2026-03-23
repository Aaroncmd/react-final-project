import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ScreenScout heading", () => {
  render(<App />);
  const heading = screen.getByText(/discover your next watch/i);
  expect(heading).toBeInTheDocument();
});
