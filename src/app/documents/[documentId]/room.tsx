"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const param = useParams();
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_3f2YxWUONFdVKQQt8A7CGzHwKTVKglhRWQivzcSxicRwLIYImhxfXFAf5quO818_"
      }
    >
      <RoomProvider id={param.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
