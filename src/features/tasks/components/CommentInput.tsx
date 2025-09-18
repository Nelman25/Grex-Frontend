import { Input } from "@/components/ui/input";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants/cloudinary";
import { useAuth } from "@/context/auth-context";
import type { NewComment } from "@/types/comment";
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useCreateCommentMutation } from "../hooks/mutations/useCreateCommentMutation";
import { uploadFileToCloudinary, uploadImageToCloudinary } from "@/api/cloudinary";
import { formatFileSize } from "@/utils";

export default function CommentInput({ taskId }: { taskId: number }) {
  const [comment, setComment] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const { mutate: addComment } = useCreateCommentMutation(taskId);

  const handleSendComment = () => {
    if (!user) return;

    const newComment: NewComment = {
      content: comment,
      sender_id: user.user_id,
    };

    addComment(newComment);
    setComment("");
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) return;

    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const file = await uploadFileToCloudinary(data);
    console.log({
      name: files[0].name,
      type: files[0].type,
      size: formatFileSize(file.bytes),
      url: file.secure_url,
    });
  };

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload file triggered!");
    const { files } = event.target;

    if (!files || files.length === 0) return;

    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const image = await uploadImageToCloudinary(data);

    console.log({
      name: files[0].name,
      type: files[0].type,
      size: formatFileSize(image.bytes),
      url: image.secure_url,
    });
    console.log(image);
  };

  return (
    <div className="mx-4 my-2 relative">
      <Input
        className="w-full pr-20"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSendComment();
          }
        }}
      />

      <Input type="file" accept="image/*" className="hidden" ref={imageRef} onChange={handleUploadImage} />
      <Input
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        className="hidden"
        ref={attachmentRef}
        onChange={handleUploadFile}
      />

      <button className="p-2 absolute top-0.5 right-0" onClick={handleSendComment}>
        <IoSendSharp />
      </button>
      <button className="p-2 absolute top-0.5 right-12" onClick={() => imageRef.current?.click()}>
        <CiImageOn />
      </button>
      <button className="p-2 absolute top-0.5 right-7" onClick={() => attachmentRef.current?.click()}>
        <MdAttachFile />
      </button>
    </div>
  );
}
