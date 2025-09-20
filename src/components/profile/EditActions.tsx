import { Button } from "@/components/ui/button";

interface EditActionsProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditActions({ isEditing, onSave, onCancel }: EditActionsProps) {
  if (!isEditing) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-dark-muted p-4 flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>Save Changes</Button>
    </div>
  );
}
