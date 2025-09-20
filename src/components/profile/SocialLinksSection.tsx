import { Input } from "@/components/ui/input";
import { BsDiscord, BsGithub, BsGlobe, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Mail } from "lucide-react";
import type { User } from "@/types/user";

interface SocialLinksSectionProps {
  user: User;
  isEditing: boolean;
  onSocialLinkChange: (platform: keyof User["social_links"], value: string) => void;
}

export default function SocialLinksSection({ user, isEditing, onSocialLinkChange }: SocialLinksSectionProps) {
  const socialLinks = [
    {
      key: "email",
      icon: <Mail className="size-5" />,
      title: "Email",
      value: user.social_links.email,
      placeholder: "Email address",
    },
    {
      key: "github",
      icon: <BsGithub className="size-5" />,
      title: "GitHub Profile",
      value: user.social_links.github,
      placeholder: "GitHub URL (optional)",
    },
    {
      key: "linkedin",
      icon: <BsLinkedin className="size-5" />,
      title: "LinkedIn Profile",
      value: user.social_links.linkedin,
      placeholder: "LinkedIn URL (optional)",
    },
    {
      key: "portfolio",
      icon: <BsGlobe className="size-5" />,
      title: "Portfolio Website",
      value: user.social_links.portfolio,
      placeholder: "Portfolio Website (optional)",
    },
    {
      key: "twitter",
      icon: <BsTwitterX className="size-5" />,
      title: "Twitter/X Profile",
      value: user.social_links.twitter,
      placeholder: "Twitter/X Profile (optional)",
    },
    {
      key: "discord",
      icon: <BsDiscord className="size-5" />,
      title: "Discord Username",
      value: user.social_links.discord,
      placeholder: "Discord Username (optional)",
    },
  ];

  if (isEditing) {
    return (
      <div className="space-y-2 w-full mt-6">
        {socialLinks.map((social) => (
          <div key={social.key} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground">{social.icon}</span>
            <Input
              value={social.value || ""}
              onChange={(e) => onSocialLinkChange(social.key as keyof User["social_links"], e.target.value)}
              placeholder={social.placeholder}
              className="pl-10"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map((social) => {
        if (!social.value) return null;

        if (social.key === "email") {
          return (
            <a
              key={social.key}
              href={`mailto:${social.value}`}
              className="hover:text-brand-primary transition-colors"
              title={social.title}
            >
              {social.icon}
            </a>
          );
        }

        if (social.key === "discord") {
          return (
            <button
              key={social.key}
              onClick={() => navigator.clipboard.writeText(social.value || "")}
              className="hover:text-brand-primary transition-colors"
              title={social.title}
            >
              {social.icon}
            </button>
          );
        }

        return (
          <a
            key={social.key}
            href={social.value}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors"
            title={social.title}
          >
            {social.icon}
          </a>
        );
      })}
    </div>
  );
}
