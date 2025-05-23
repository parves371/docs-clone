import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/" className="text-lg font-semibold">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
        </Link>
        <h3>Docs</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center shrink-0 pl-6">
        <OrganizationSwitcher 
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
      </div>

      <UserButton />
    </nav>
  );
};
