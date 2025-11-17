import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthProvider";
import SignupForm from "../components/SignupForm";

const mockedNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return { ...actual, useNavigate: () => mockedNavigate };
});

const renderSignupForm = () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("SignupForm", () => {
  test("renders all fields and submit button", () => {
    renderSignupForm();
    const fields = ["First name", "Last name", "Email", "Password", "Confirm Password"];

    fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
  });

  test("user can fill the form and submit successfully", async () => {
    renderSignupForm();
    const user = userEvent.setup();
    const fieldsAndValue = [
      ["First name", "Jonel"],
      ["Last name", "Villaver"],
      ["Email", "jonelvillaver@gmail.com"],
      ["Password", "Jonelvillaver123!"],
      ["Confirm Password", "Jonelvillaver123!"],
    ];

    for (const [field, value] of fieldsAndValue) {
      await user.type(screen.getByLabelText(field), value);
    }

    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledOnce();
      expect(mockedNavigate).toHaveBeenCalledWith("/my-projects", { replace: true });
    });
  });
});
