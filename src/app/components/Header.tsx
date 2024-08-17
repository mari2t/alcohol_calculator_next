import Link from "next/link";
import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <header className="flex justify-center items-center w-full p-4">
      <div>
        <Link href="/" className="text-blue-900 font-bold text-3xl">
          アルコール計算機
        </Link>
      </div>
    </header>
  );
};

export default Header;
