import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../hooks/mutations/useCreateCategoryMutation";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useEditCategoryMutation } from "../../hooks/mutations/useEditCategoryMutation";
import { useFetchCategoryQuery } from "../../hooks/queries/useFetchCategoriesQuery";
import { getCategoryId } from "@/utils";

type Props = {
  onCancel: () => void;
  category?: string;
};
export default function NewCategoryInput({ onCancel, category }: Props) {
  const [newCategory, setNewCategory] = useState(category ?? "");

  const { workspace_id } = useParams();

  const { data: categories = [] } = useFetchCategoryQuery(Number(workspace_id));
  const { mutate: createCategory, error } = useCreateCategoryMutation(
    Number(workspace_id)
  );

  const { mutate: editCategory } = useEditCategoryMutation(
    Number(workspace_id)
  );

  const handleSubmit = () => {
    // this means the user only wants to edit
    if (category) {
      const categoryId = getCategoryId(category, categories);
      if (categoryId) {
        editCategory({ name: newCategory, categoryId });
        toast(`Renamed ${category} to ${newCategory}`);
      }
    } else {
      // user is creating a new category
      createCategory(newCategory);
      toast(`Create ${newCategory} category.`);
    }

    onCancel();
  };

  if (error) toast(error.message);

  return (
    <div className="flex flex-col space-y-3 w-full min-w-[220px] self-start rounded-sm mt-6">
      <Input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <div className="flex space-x-2 text-sm">
        <button
          onClick={handleSubmit}
          className="px-2 py-1 rounded text-light-text bg-brand-primary hover"
        >
          {category ? "Save changes" : "Add Category"}
        </button>
        <button onClick={onCancel} className="px-2 py-1">
          Cancel
        </button>
      </div>
    </div>
  );
}
