import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { AuthProvider } from "../components/AuthProvider";
import SignupForm from "../components/SignupForm";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

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

const fillForm = async (user: ReturnType<typeof userEvent.setup>, fieldsAndValues: Record<string, string>) => {
  for (const [field, value] of Object.entries(fieldsAndValues)) {
    await user.type(screen.getByLabelText(field), value);
  }
};

describe("SignupForm", () => {
  test("renders all fields and submit button", () => {
    renderSignupForm();

    const fields = ["First name", "Last name", "Email", "Password", "Confirm Password"];

    fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
  });

  test("fails validation if email is missing", async () => {
    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Password: "Jonelvillaver123!",
      "Confirm Password": "Jonelvillaver123!",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await screen.findByText("Email is required");
  });

  test("fails validation if password is missing", async () => {
    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Email: "jonelvillaver@gmail.com",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await screen.findByText("Password is required");
  });

  test("fails validation if confirm password doesn't match password", async () => {
    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Email: "jonelvillaver@gmail.com",
      Password: "Thisistherealpassword12#",
      "Confirm Password": "Thisdoesntmatchthepassword42!",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await screen.findByText("Password must match");
  });

  test("fails if the email already exist", async () => {
    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Email: "existingemail@gmail.com",
      Password: "Jonelvillaver123!",
      "Confirm Password": "Jonelvillaver123!",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await screen.findByText("This email is already taken.");
  });

  test("signup fails when server returns 500", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}auth/sign-up`, () => {
        return HttpResponse.json({ detail: "Internal server error" }, { status: 500 });
      })
    );

    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Email: "jonelvillaver@gmail.com",
      Password: "Jonelvillaver123!",
      "Confirm Password": "Jonelvillaver123!",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await screen.findByText("Failed to create account");
  });

  test("submits form successfully with valid data", async () => {
    renderSignupForm();

    const user = userEvent.setup();
    const fieldsAndValues = {
      "First name": "Jonel",
      "Last name": "Villaver",
      Email: "jonelvillaver@gmail.com",
      Password: "Jonelvillaver123!",
      "Confirm Password": "Jonelvillaver123!",
    };

    await fillForm(user, fieldsAndValues);
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledOnce();
      expect(mockedNavigate).toHaveBeenCalledWith("/my-projects", { replace: true });
    });
  });
});
