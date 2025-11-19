import { type SignupUser } from "@/features/auth/schemas/auth.schema";
import type { IUserCredentials } from "@/types";
import { http, HttpResponse } from "msw";

const FAKE_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJ1c2VyIjoidHJhc2hfZHVtbXlfZGF0YSIsImlhdCI6MTYwOTAwMDAwfQ.s3lfM4d3_up3r_f4k3d_tr4sh_t0k3n";
const FAKE_EXPIRES_AT = 1762837197.0048153;

export const authHandlers = [
  http.post(`${import.meta.env.VITE_API_URL}auth/sign-up`, async ({ request }) => {
    const { first_name, last_name, email, password_hash } = (await request.json()) as Omit<SignupUser, "confirm_password">;

    // MISSING FIELDS
    if (!first_name || !last_name || !email || !password_hash) {
      return HttpResponse.json({ detail: "Missing fields." }, { status: 400 });
    }

    // EMAIL ALREADY TAKEN
    if (email === "existingemail@gmail.com") {
      return HttpResponse.json({ detail: "This email is already taken." }, { status: 409 });
    }

    // SUCCESS
    return HttpResponse.json(
      {
        user: {
          user_id: 1,
          first_name: first_name,
          last_name: last_name,
          email: email,
          profile_picture: null,
          phone_number: null,
        },
        access_token: FAKE_ACCESS_TOKEN,
        expires_at: FAKE_EXPIRES_AT,
      },
      { status: 200 }
    );
  }),

  http.post(`${import.meta.env.VITE_API_URL}auth/login`, async ({ request }) => {
    const body = (await request.json()) as IUserCredentials;

    if (!body.email || !body.password_hash) {
      return HttpResponse.json({ detail: "Missing fields." }, { status: 400 });
    }
  }),
];
