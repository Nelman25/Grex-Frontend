import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const UserSchema = yup.object().shape({
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email.").required("Required"),
  password_hash: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(PASSWORD_REGEX, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    })
    .required("Required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password_hash")], "Password must match")
    .required("Required"),
});

export type SignupUser = yup.InferType<typeof UserSchema>;
