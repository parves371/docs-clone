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
import { getUsers } from "./action";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
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
      authEndpoint={"/api/liveblocks-auth"}
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
        console.log(filterUsers);

        return filterUsers.map((user) => user.id); // Return only the user IDs
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={param.documentId as string}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label="room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
