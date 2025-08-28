import { getInitials } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  name: string;
  photoUrl: string | undefined;
  className?: string;
};

export default function UserAvatar({ name, photoUrl, className }: Props) {
  return (
    <Avatar>
      <AvatarImage
        className={`size-7 rounded-full ${className}`}
        src={photoUrl}
      />
      <AvatarFallback className="bg-brand-primary/30">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
