import { Editor } from "./editor";

interface DocumentsIdPageProps {
  params: Promise<{ documentId: string }>;
}
const DocumentsIdPage = async ({ params }: DocumentsIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fbfbfb] ">
      DocumentsIdPage
      <Editor />
    </div>
  );
};

export default DocumentsIdPage;
