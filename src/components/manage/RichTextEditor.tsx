import { useRef } from "react";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Scrie articolul...",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (cmd: string, arg?: string) => {
    document.execCommand(cmd, false, arg);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertLink = () => {
    const url = window.prompt("URL link:");
    if (url) exec("createLink", url);
  };

  return (
    <div className="border rounded-md bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b p-2">
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("bold")} title="Bold">
          <Bold size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("italic")} title="Italic">
          <Italic size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("formatBlock", "<h2>")} title="H2">
          <Heading2 size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("formatBlock", "<h3>")} title="H3">
          <Heading3 size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("insertUnorderedList")} title="Listă">
          <List size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("insertOrderedList")} title="Listă numerotată">
          <ListOrdered size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={insertLink} title="Link">
          <LinkIcon size={16} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => exec("formatBlock", "<blockquote>")} title="Citat">
          <Quote size={16} />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="prose-custom min-h-[400px] p-4 focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default RichTextEditor;
