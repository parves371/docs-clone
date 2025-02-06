"use client";
import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentTable } from "./document-table";

const Home = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0  z-10 h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default Home;
