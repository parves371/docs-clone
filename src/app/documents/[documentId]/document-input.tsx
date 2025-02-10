import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Adjust import path
import { toast } from "sonner";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.document.updateById);

  // Debounced save function
  const debouncedSave = useDebounce(
    async (newTitle: string) => {
      try {
        await mutate({ id, title: newTitle });
        setIsError(false);
        toast.success("Saved");
      } catch (error) {
        setIsError(true);
      }
    },
    500 // 500ms delay
  );

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setIsError(false);

    try {
      // Immediate save and cancel any pending debounced saves
      await mutate({ id, title: value });
      setIsEditing(false);
      toast.success("Saved");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ""}
          </span>
          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              setValue(newValue);
              debouncedSave(newValue); // Trigger debounced save
            }}
            onBlur={() => setIsEditing(false)}
            aria-label="Document title"
            role="textbox"
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {isError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
