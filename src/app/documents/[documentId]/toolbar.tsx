"use client";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";
import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeight = [
    {
      label: "default",
      value: "normal",
    },
    {
      label: "single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "double",
      value: "2",
    },
  ];

  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeight.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              editor.chain().focus().setLineHeight(value).run();
            }}
            className={`flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ${
              editor.getAttributes("paragraph").lineHeight === value
                ? "bg-neutral-200/80"
                : ""
            }`}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const curentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(curentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size >= 1 && size <= 100) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputeBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const size = parseInt(fontSize);
    if (size < 100) {
      updateFontSize(`${size + 1}`);
    }
  };

  const decrement = () => {
    const size = parseInt(fontSize);
    if (size > 1) {
      updateFontSize(`${size - 1}`);
    }
  };

  if (!editor) return null;

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputeChange}
          onBlur={handleInputeBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(curentFontSize);
          }}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
        >
          {curentFontSize}
        </button>
      )}

      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
const ListButton = () => {
  const { editor } = useEditorStore();

  const Lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onclick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onclick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {Lists.map(({ label, icon: Icon, onclick, isActive }) => (
          <button
            key={label}
            onClick={onclick}
            className={`flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ${
              isActive() ? "bg-neutral-200/80" : ""
            }`}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const AlingButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    { label: "Align Left", value: "left", icon: AlignLeftIcon },
    { label: "Align Center", value: "center", icon: AlignCenterIcon },
    { label: "Align Right", value: "right", icon: AlignRightIcon },
    { label: "Align Justify", value: "justify", icon: AlignJustifyIcon },
  ];

  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => {
              editor.chain().focus().setTextAlign(value).run();
            }}
            className={`flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ${
              editor.isActive({ textAlign: value }) ? "bg-neutral-200/80" : ""
            }`}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        onChange(imgUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDiologOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDiologOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDiologOpen} onOpenChange={setIsDiologOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setValue(editor?.getAttributes("link").href || "");
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#ffffff";
  const onchange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onchange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onchange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onchange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeaddingLavelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontsize: "16px" },
    { label: "Heading 1", value: 1, fontsize: "32px" },
    { label: "Heading 2", value: 2, fontsize: "24px" },
    { label: "Heading 3", value: 3, fontsize: "20px" },
    { label: "Heading 4", value: 4, fontsize: "18px" },
    { label: "Heading 5", value: 5, fontsize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Headng  ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontsize }) => (
          <button
            key={value}
            style={{ fontSize: fontsize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === font.value
                ? "bg-neutral-200/80"
                : ""
            )}
            style={{ fontFamily: font.value }}
            onClick={() => {
              editor?.chain().focus().setFontFamily(font.value).run();
            }}
          >
            <span className={`text-sm`}>{font.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onclick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onclick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={cn(
        `text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80`,
        isActive && `bg-neutral-200/80`
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const section: {
    label: string;
    icon: LucideIcon;
    onclick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onclick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onclick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onclick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onclick: () => {
          const currentText = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            currentText === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onclick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onclick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onclick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onclick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onclick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onclick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9]  px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto  ">
      {section[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-5 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-5 bg-neutral-300" />
      <HeaddingLavelButton />
      <Separator orientation="vertical" className="h-5 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-5 bg-neutral-300" />
      {section[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-5 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlingButton />
      <LineHeightButton />
      <ListButton />

      {section[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
