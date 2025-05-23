"use client";

import { FullscreenLoader } from "@/components/fullscreenloader";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getDocuments, getUsers } from "./action";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARIN_DEFAULT } from "@/constants/margin";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
};
export function Room({ children }: { children: ReactNode }) {
  const param = useParams();

  const [users, setuser] = useState<User[]>([]);
  const fetchUser = useMemo(
    () => async () => {
      try {
        const users = await getUsers();
        setuser(users);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = param.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((id) => users.find((u) => u.id === id)) ?? undefined;
      }}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users; // Assuming 'user' is your array of user objects

        if (text) {
          filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filterUsers.map((user) => user.id); // Return only the user IDs
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);

        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={param.documentId as string}
        initialStorage={{
          leftMargine: LEFT_MARGIN_DEFAULT,
          rightMargine: RIGHT_MARIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
