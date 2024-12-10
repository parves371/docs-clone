import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

interface DocumentsIdPageProps {
  params: Promise<{ documentId: string }>;
}
const DocumentsIdPage = async ({ params }: DocumentsIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fbfbfb] ">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentsIdPage;
