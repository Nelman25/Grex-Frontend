import { mockUser } from "@/mocks/users";
import type { SocialLink, User } from "@/types/user";
import { Mail, PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { BsDiscord, BsGithub, BsGlobe, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ProfileCard() {
  const [editedUser, setEditedUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const socialLinks: SocialLink[] = [
    {
      url: editedUser.social_links.email,
      icon: <Mail className="size-5" />,
      title: "GitHub Profile",
    },
    {
      url: editedUser.social_links.linkedin,
      icon: <BsLinkedin className="size-5" />,
      title: "LinkedIn Profile",
    },
    {
      url: editedUser.social_links.portfolio,
      icon: <BsGlobe className="size-5" />,
      title: "Portfolio Website",
    },
    {
      url: editedUser.social_links.twitter,
      icon: <BsTwitterX className="size-5" />,
      title: "Twitter/X Profile",
    },
    {
      url: editedUser.social_links.github,
      icon: <BsGithub className="size-5" />,
      title: "GitHub Profile",
    },
  ] as const;

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setEditedUser((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = () => {
    console.log("Saving user:", editedUser);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="bg-dark-surface border-dark-muted rounded">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            {/* Move edit button next to the profile name */}
            <div className="relative w-32 h-32 group mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-primary">
                <img
                  src={editedUser.profile_picture ?? ""}
                  alt={editedUser.first_name + " " + editedUser.last_name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <PencilIcon className="size-6 text-white" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4 md:grid">
                  <Input
                    value={editedUser.first_name}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev, first_name: e.target.value }))}
                    className="text-center"
                    placeholder="First Name"
                  />

                  <Input
                    value={editedUser.last_name}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev, last_name: e.target.value }))}
                    className="text-center"
                    placeholder="Last Name"
                  />
                </div>
                <Input
                  value={editedUser.role ?? ""}
                  onChange={(e) => setEditedUser((prev) => ({ ...prev, role: e.target.value }))}
                  className="text-center"
                  placeholder="Role"
                />
                <Textarea
                  value={editedUser.bio ?? ""}
                  onChange={(e) => setEditedUser((prev) => ({ ...prev, bio: e.target.value }))}
                  className="text-center min-h-[100px]"
                  placeholder="Bio"
                />
              </div>
            ) : (
              <div className="relative w-full text-center">
                <h2 className="text-2xl font-semibold mb-1">{editedUser.first_name + " " + editedUser.last_name}</h2>
                <p className="text-muted-foreground">{editedUser.role}</p>
                <p className="text-sm mt-4 text-muted-foreground">{editedUser.bio}</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -right-2 top-0 p-2 hover:bg-muted/50 rounded-full transition-colors"
                >
                  <PencilIcon className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              {isEditing ? (
                <div className="space-y-2 w-full">
                  <div className="relative">
                    <BsGithub className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      value={editedUser.social_links.github || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          social_links: {
                            ...prev.social_links,
                            github: e.target.value || undefined,
                          },
                        }))
                      }
                      placeholder="GitHub URL (optional)"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <BsLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      value={editedUser.social_links.linkedin || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          social_links: {
                            ...prev.social_links,
                            linkedin: e.target.value || undefined,
                          },
                        }))
                      }
                      placeholder="LinkedIn URL (optional)"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <BsGlobe className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      value={editedUser.social_links.portfolio || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          social_links: {
                            ...prev.social_links,
                            portfolio: e.target.value || undefined,
                          },
                        }))
                      }
                      placeholder="Portfolio Website (optional)"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <BsTwitterX className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      value={editedUser.social_links.twitter || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          social_links: {
                            ...prev.social_links,
                            twitter: e.target.value || undefined,
                          },
                        }))
                      }
                      placeholder="Twitter/X Profile (optional)"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <BsDiscord className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      value={editedUser.social_links.discord || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          social_links: {
                            ...prev.social_links,
                            discord: e.target.value || undefined,
                          },
                        }))
                      }
                      placeholder="Discord Username (optional)"
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    if (!social.url && !social.value) return null;

                    if (social.type === "discord") {
                      return (
                        social.value && (
                          <button
                            key={index}
                            onClick={() => navigator.clipboard.writeText(social.value ?? "")}
                            className="hover:text-brand-primary transition-colors"
                            title={social.title}
                          >
                            {social.icon}
                          </button>
                        )
                      );
                    }

                    if (social.type === "email") {
                      return (
                        <a
                          key={index}
                          href={`mailto:${social.value}`}
                          className="hover:text-brand-primary transition-colors"
                          title={social.title}
                        >
                          {social.icon}
                        </a>
                      );
                    }

                    return (
                      social.url && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-primary transition-colors"
                          title={social.title}
                        >
                          {social.icon}
                        </a>
                      )
                    );
                  })}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {editedUser.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="group">
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 opacity-0 group-hover:opacity-100">
                      <X className="size-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Add skill and press Enter"
                  className="w-full mt-2"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-dark-muted p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </>
  );
}
