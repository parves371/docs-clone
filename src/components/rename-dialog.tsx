"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "./ui/button";
interface RenameDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  insialTitle: string;
}

export const RenameDailog = ({
  children,
  documentId,
  insialTitle,
}: RenameDialogProps) => {
  const update = useMutation(api.document.updateById);
  const [isUpdating, setIsupdating] = useState(false);

  const [title, setTitle] = useState(insialTitle);
  const [iOpen, setIOpen] = useState(false);

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsupdating(true);
    update({
      id: documentId,
      title: title.trim() || "untitled",
    })
    .finally(() => {
      setIsupdating(false);
      setIOpen(false);
    });
  };

  return (
    <Dialog open={iOpen} onOpenChange={setIOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onsubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="untitled"
              className="w-full outline-none"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setIOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
