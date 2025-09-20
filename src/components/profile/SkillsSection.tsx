import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { User } from "@/types/user";

interface SkillsSectionProps {
  user: User;
  isEditing: boolean;
  onSkillsChange: (skills: string[]) => void;
}

export default function SkillsSection({ user, isEditing, onSkillsChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      onSkillsChange([...user.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(user.skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="w-full mt-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {user.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="group">
            {skill}
            {isEditing && (
              <button onClick={() => handleRemoveSkill(skill)} className="ml-2 opacity-0 group-hover:opacity-100">
                <X className="size-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
      {isEditing && (
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleAddSkill}
          placeholder="Add skill and press Enter"
          className="w-full"
        />
      )}
    </div>
  );
}
