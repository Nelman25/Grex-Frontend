import api from "@/lib/axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { MemoryRouter } from "react-router";
import { expect, test, vi } from "vitest";
import { AuthProvider } from "../components/AuthProvider";
import SignupForm from "../components/SignupForm";

const FAKE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJ1c2VyIjoidHJhc2hfZHVtbXlfZGF0YSIsImlhdCI6MTYwOTAwMDAwfQ.s3lfM4d3_up3r_f4k3d_tr4sh_t0k3n";
const mockedNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const renderWithRouter = () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    </MemoryRouter>
  );
};

test("renders the signup form fields", () => {
  renderWithRouter();

  expect(screen.getByLabelText("First name")).toBeInTheDocument();
  expect(screen.getByLabelText("Last name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
});

test("allows users to fill the form", () => {
  renderWithRouter();

  act(() => {
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Jonel" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Villaver" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jonelvillaver@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "jonel123" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "jonel123" } });
  });

  const firstNameInput = screen.getByLabelText("First name") as HTMLInputElement;
  const lastNameInput = screen.getByLabelText("Last name") as HTMLInputElement;
  const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  const confirmPasswordInput = screen.getByLabelText("Confirm Password") as HTMLInputElement;

  expect(firstNameInput.value).toBe("Jonel");
  expect(lastNameInput.value).toBe("Villaver");
  expect(emailInput.value).toBe("jonelvillaver@gmail.com");
  expect(passwordInput.value).toBe("jonel123");
  expect(confirmPasswordInput.value).toBe("jonel123");
});

test("MSW is intercepting axios requests", async () => {
  const response = await api.post("/auth/sign-up", {
    first_name: "Test",
    last_name: "User",
    email: "test@example.com",
    password_hash: "password123",
  });

  expect(response.status).toBe(200);
  expect(response.data.access_token).toBe(FAKE_TOKEN);
});

test("user can signup successfully", async () => {
  const user = userEvent.setup();

  renderWithRouter();

  await user.type(screen.getByLabelText("First name"), "Jonel");
  await user.type(screen.getByLabelText("Last name"), "Villaver");
  await user.type(screen.getByLabelText("Email"), "jonelvillaver@gmail.com");
  await user.type(screen.getByLabelText("Password"), "Jonelvillaver123!");
  await user.type(screen.getByLabelText("Confirm Password"), "Jonelvillaver123!");

  const button = screen.getByRole("button", { name: "Create Account" });

  await user.click(button);

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/my-projects", { replace: true });
  });
});

// await waitFor(() => {
//   const errors = screen.queryAllByText(/./);
//   console.log(
//     "All text on screen:",
//     errors.map((e) => e.textContent)
//   );
// });

// screen.debug();
