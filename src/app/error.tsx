"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Somthing went worng
          </h3>
          <p>{error.message}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="font-medium px-6" onClick={reset}>
            {" "}
            Try again
          </Button>
          <Button className="font-medium" variant={"ghost"} asChild>
            <Link href={"/"}>Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
