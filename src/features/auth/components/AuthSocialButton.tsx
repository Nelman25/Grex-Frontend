import { Button } from "@/components/ui/button";
import type { IAuthSocial } from "../types/auth";

interface AuthSocialButtonProps {
  social: IAuthSocial;
  signin?: boolean;

  // TODO: Function for calling social auth related api
}

export default function AuthSocialButton({
  social,
  signin,
}: AuthSocialButtonProps) {
  return (
    <Button className="bg-[#D9D9D9]/20 rounded-md border items-center hover:bg-[#D9D9D9]/10  border-[#808080] px-12 flex-1 py-3">
      <social.icon className="size-6 text-white/60" />
      <span className="text-dark-text">
        {signin ? `Continue with ${social.provider}` : social.provider}
      </span>
    </Button>
  );
}
