import type { IconType } from "react-icons/lib";

export interface IUserCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  confirm_password: string;
}

export interface IAuthSocial {
  provider: string;
  icon: IconType;
}
