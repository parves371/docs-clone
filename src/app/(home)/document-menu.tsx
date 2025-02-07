import { Id } from "../../../convex/_generated/dataModel";

import {
  ExternalLinkIcon,
  FilePen,
  MoreVertical,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RemoveDailog } from "@/components/remove-dialog";
import { RenameDailog } from "@/components/rename-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}
export const DocumentMenu = ({
  documentId,
  onNewTab,
  title,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDailog documentId={documentId} insialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePen className="size-4 mr-2" /> Rename
          </DropdownMenuItem>
        </RenameDailog>
        <RemoveDailog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="size-4 mr-2" /> remove
          </DropdownMenuItem>
        </RemoveDailog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon /> Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
