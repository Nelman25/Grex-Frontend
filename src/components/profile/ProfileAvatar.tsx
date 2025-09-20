import { PencilIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import type { User } from "@/types/user";
import { useRef, useState } from "react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants/cloudinary";
import { uploadImageToCloudinary } from "@/api/cloudinary";
import { toast } from "sonner";

interface ProfileAvatarProps {
  user: User;
  isEditing: boolean;
  onFieldChange: (field: keyof User, value: string) => void;
}

export default function ProfileAvatar({ user, isEditing, onFieldChange }: ProfileAvatarProps) {
  const [preview, setPreview] = useState(user.profile_picture ?? undefined);
  const profileRef = useRef<HTMLInputElement | null>(null);

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const image = await uploadImageToCloudinary(data);

      setPreview(image.secure_url);
      onFieldChange("profile_picture", image.secure_url);
      toast.success("Updated profile picture");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-32 h-32 group mb-6">
      <Avatar className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-primary">
        <AvatarImage className="object-cover" src={preview} />
        <AvatarFallback className="text-4xl">{getInitials(`${user.first_name} ${user.last_name}`)}</AvatarFallback>
      </Avatar>

      {isEditing && (
        <>
          <button
            onClick={() => profileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PencilIcon className="size-6 text-white" />
          </button>

          <input type="file" accept="image/*" className="hidden" ref={profileRef} onChange={handleProfilePhotoChange} />
        </>
      )}
    </div>
  );
}
