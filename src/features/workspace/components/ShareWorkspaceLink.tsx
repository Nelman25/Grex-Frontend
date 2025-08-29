import { Label } from "@/components/ui/label";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export default function ShareWorkspaceLink() {
  const [isCopied, setIsCopied] = useState(false);

  const workspaceLink = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(workspaceLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 10000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Label>Copy Link</Label>
      <div className="flex gap-4">
        <div className="p-2 rounded bg-dark-surface my-2">
          <p className="text-sm text-dark-subtle line-clamp-1">
            {workspaceLink}
          </p>
        </div>
        <button onClick={handleCopyLink}>
          {isCopied ? (
            <Check className="size-4" />
          ) : (
            <Clipboard className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
