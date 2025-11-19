import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const UserSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Please enter a valid email.").required("Email is required"),
  password_hash: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(PASSWORD_REGEX, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    })
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password_hash")], "Password must match")
    .required("Confirm password is required"),
});

export type SignupUser = yup.InferType<typeof UserSchema>;
