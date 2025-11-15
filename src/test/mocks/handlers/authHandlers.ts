import type { SignupUser } from "@/schemas/auth.schema";
import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post(`${import.meta.env.VITE_API_URL}auth/sign-up`, async ({ request }) => {
    const body = (await request.json()) as Omit<SignupUser, "confirm_password">;

    if (!body.email || !body.password_hash) {
      return HttpResponse.json({ detail: "Missing fields." }, { status: 400 });
    }

    return HttpResponse.json(
      {
        user: {
          user_id: 1,
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          profile_picture: null,
          phone_number: null,
        },
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJ1c2VyIjoidHJhc2hfZHVtbXlfZGF0YSIsImlhdCI6MTYwOTAwMDAwfQ.s3lfM4d3_up3r_f4k3d_tr4sh_t0k3n",
        expires_at: 1762837197.0048153,
      },
      { status: 200 }
    );
  }),
];
