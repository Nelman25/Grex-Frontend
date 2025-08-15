import type { FormikErrors } from "formik";

export interface IUserCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  confirm_password: string;
}

export interface CreateAccountHandler {
  values: IUserCredentials;
  setErrors: (errors: FormikErrors<IUserCredentials>) => void;
}
