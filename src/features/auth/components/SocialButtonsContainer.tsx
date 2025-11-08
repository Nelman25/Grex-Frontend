import { AUTH_SOCIALS } from "../constants";
import AuthSocialButton from "./AuthSocialButton";

const SIGNIN_STYLE = "space-y-2";
const SIGNUP_STYLE = "flex space-x-2 mt-4";

export default function SocialButtonsContainer({ signin }: { signin?: true }) {
  // TODO: Function for social auth operations

  return (
    <div className={`overflow-x-auto ${signin ? SIGNIN_STYLE : SIGNUP_STYLE}`}>
      {AUTH_SOCIALS.map((social) => (
        <AuthSocialButton key={social.provider} social={social} signin={signin} />
      ))}
    </div>
  );
}
