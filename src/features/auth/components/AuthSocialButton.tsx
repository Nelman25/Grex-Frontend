import { Button } from "@/components/ui/button";
import type { IAuthSocial } from "../types/auth";

interface AuthSocialButtonProps {
  social: IAuthSocial;
  signin?: boolean;

  // TODO: Function for calling social auth related api
}

export default function AuthSocialButton({ social, signin }: AuthSocialButtonProps) {
  return (
    <Button className="w-full bg-white/10 rounded-md sm:text-sm border items-center hover:bg-white/20  border-white/30 flex-1 py-4 lg:py-6">
      <social.icon className="size-4 lg:size-6 text-white/60" />
      <span className="text-dark-text text-xs lg:text-sm">{signin ? `Continue with ${social.provider}` : social.provider}</span>
    </Button>
  );
}
