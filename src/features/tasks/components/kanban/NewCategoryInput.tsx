import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../hooks/mutations/useCreateCategoryMutation";
import { useParams } from "react-router";
import { toast } from "sonner";

type Props = {
  onCancel: () => void;
};
export default function NewCategoryInput({ onCancel }: Props) {
  const { workspace_id } = useParams();
  const [category, setCategory] = useState("");
  const { mutate, error } = useCreateCategoryMutation(Number(workspace_id));

  const handleSubmit = () => {
    mutate(category);
    toast(`Create ${category} category.`);
    onCancel();
  };

  if (error) toast(error.message);

  return (
    <div className="flex flex-col space-y-3 w-[200px] self-start rounded-sm mt-6">
      <Input
        type="text"
        className=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="flex space-x-2 text-sm">
        <button
          onClick={handleSubmit}
          className="px-2 py-1 rounded text-light-text bg-brand-primary hover"
        >
          Add Category
        </button>
        <button onClick={onCancel} className="px-2 py-1">
          Cancel
        </button>
      </div>
    </div>
  );
}
