import { uploadFileToCloudinary, uploadImageToCloudinary } from "@/api/cloudinary";
import { Input } from "@/components/ui/input";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants/cloudinary";
import { useAuth } from "@/context/auth-context";
import type { NewComment, NewCommentAttachment } from "@/types/comment";
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useCreateCommentMutation } from "../hooks/mutations/useCreateCommentMutation";
import FileAttachment from "./FileAttachment";

export default function CommentInput({ taskId }: { taskId: number }) {
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [comment, setComment] = useState("");
  const [newAttachment, setNewAttachment] = useState<NewCommentAttachment | undefined>(undefined);

  const { user } = useAuth();
  const { mutate: addComment } = useCreateCommentMutation(taskId);

  const handleSendComment = () => {
    if (!user) return;

    const newComment: NewComment = {
      sender_id: user.user_id,
    };

    if (comment) {
      newComment.content = comment;
    }

    if (newAttachment) {
      newComment.attachments = newAttachment;
    }

    if (!newComment.content && !newComment.attachments) return;

    addComment(newComment);
    setComment("");
    setNewAttachment(undefined);
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) return;

    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const file = await uploadFileToCloudinary(data);

    setNewAttachment({
      name: files[0].name,
      file_type: "file",
      file_size: file.bytes,
      file_url: file.secure_url,
    });

    attachmentRef.current = null;
  };

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) return;

    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const image = await uploadImageToCloudinary(data);

    setNewAttachment({
      name: files[0].name,
      file_type: "image",
      file_size: image.bytes,
      file_url: image.secure_url,
    });

    imageRef.current = null;
  };

  const removeAttachment = () => {
    setNewAttachment(undefined);
  };

  return (
    <div className="mx-4 my-2 relative">
      {newAttachment && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg p-3">
          <div className="flex items-start justify-between">
            <FileAttachment attachment={newAttachment} />
            <button
              onClick={removeAttachment}
              className="ml-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
        placeholder="Type a comment..."
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
