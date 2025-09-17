import { AVATAR_COLORS } from "@/constants";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  name: string;
  photoUrl: string | undefined;
  className?: string;
};

export default function UserAvatar({ name, photoUrl, className }: Props) {
  const getRandomColor = () => {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  };
  const bg = getRandomColor();

  return (
    <Avatar className={className}>
      {photoUrl ? (
        <AvatarImage className={`size-7 rounded-full ${className}`} src={photoUrl} />
      ) : (
        <AvatarImage
          className={`size-7 rounded-full ${className}`}
          src={`https://ui-avatars.com/api/?name=${name}&background=${bg}&color=fff`}
        />
      )}
    </Avatar>
  );
}
