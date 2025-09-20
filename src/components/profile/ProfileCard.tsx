import PageLoader from "@/components/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useFetchUserProfileQuery } from "@/hooks/queries/useFetchUserProfileQuery";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import SocialLinksSection from "./SocialLinksSection";
import UserInfoSection from "./UserInfoSection";

import { useEditUserProfileMutation } from "@/hooks/mutations/useEditUserProfileMutation";
import { toast } from "sonner";
import EditActions from "./EditActions";
import SkillsSection from "./SkillsSection";
import { getObjectDiff } from "@/utils";

export default function ProfileCard() {
  const { user: authUser } = useAuth();
  const { data: userProfile, isLoading } = useFetchUserProfileQuery(authUser?.user_id);
  const { mutate: editUserProfile } = useEditUserProfileMutation();
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setEditedUser(userProfile);
    }
  }, [userProfile]);

  const updateUserField = (field: keyof User, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const updateSocialLink = (platform: keyof User["social_links"], value: string) => {
    setEditedUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        social_links: {
          ...prev.social_links,
          [platform]: value || undefined,
        },
      };
    });
  };

  const updateSkills = (skills: string[]) => {
    setEditedUser((prev) => (prev ? { ...prev, skills } : null));
  };

  const handleSave = () => {
    if (!authUser?.user_id) {
      toast.error("Failed to update profile. Invalid user ID.");
      return;
    }
    if (!editedUser || !userProfile) {
      toast.error("Empty payload, please try again.");
      return;
    }

    const changedFields = getObjectDiff(userProfile, editedUser);

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes to save");
      setIsEditing(false);
      return;
    }

    editUserProfile({ user_id: authUser.user_id, payload: changedFields });

    toast.success("Updated profile");

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(userProfile || null);
    setIsEditing(false);
  };

  if (isLoading) return <PageLoader />;
  if (!editedUser) return <div>Profile not found</div>;

  return (
    <>
      <Card className="bg-dark-surface border-dark-muted rounded">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            <ProfileAvatar user={editedUser} isEditing={isEditing} onFieldChange={updateUserField} />

            <UserInfoSection
              user={editedUser}
              isEditing={isEditing}
              onFieldChange={updateUserField}
              onEditToggle={() => setIsEditing(!isEditing)}
            />

            <SocialLinksSection user={editedUser} isEditing={isEditing} onSocialLinkChange={updateSocialLink} />

            <SkillsSection user={editedUser} isEditing={isEditing} onSkillsChange={updateSkills} />
          </div>
        </CardContent>
      </Card>

      <EditActions isEditing={isEditing} onSave={handleSave} onCancel={handleCancel} />
    </>
  );
}
