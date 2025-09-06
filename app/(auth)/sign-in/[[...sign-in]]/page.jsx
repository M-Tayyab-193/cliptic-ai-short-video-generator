import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
