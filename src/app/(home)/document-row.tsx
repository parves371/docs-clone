import { SiGoogledocs } from "react-icons/si";
import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Building2Icon,
  CircleUserIcon,
  MoreVertical,
  MoreVerticalIcon,
  Table,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DocumentsRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentsRowProps) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <button>
          <MoreVertical className="size-4" />
        </button>
      </TableCell>
    </TableRow>
  );
};
