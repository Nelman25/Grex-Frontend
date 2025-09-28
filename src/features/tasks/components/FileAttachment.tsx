import { FileText, Download, Image as ImageIcon } from "lucide-react";
import type { Comment, NewCommentAttachment } from "@/types/comment";
import { LuDot } from "react-icons/lu";
import { formatFileSize, getFileExtension } from "@/utils";

type FileAttachmentProps = {
  attachment: Comment["attachments"] | NewCommentAttachment;
};

export default function FileAttachment({ attachment }: FileAttachmentProps) {
  if (!attachment) return null;

  const { file_type, file_url, name } = attachment;

  const getFileIcon = () => {
    switch (file_type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "file":
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (file_type === "image") {
    return (
      <div className="mt-2 w-full">
        <div className="relative group">
          <img
            src={file_url}
            className="max-w-60 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm transition-transform"
            alt={name}
          />
          <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 dark:group-hover:bg-opacity-20 transition-opacity rounded-lg" />
        </div>
        <a
          href={file_url}
          download={name}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <Download className="w-3 h-3" />
          Download image
        </a>
      </div>
    );
  }

  if (file_type === "file") {
    return (
      <div className="mt-2">
        <a
          href={file_url}
          download={name}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 p-3 bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group max-w-md w-full"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-2 border bg-gray-100 dark:bg-gray-800 rounded group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors shadow-lg">
              {getFileIcon()}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{name}</span>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">{getFileExtension(name)}</span>
                <LuDot />
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(attachment.file_size)}</span>
              </div>
            </div>
          </div>
          <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
        </a>
      </div>
    );
  }

  return null;
}
