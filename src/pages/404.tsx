import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-black/90 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-6 text-base leading-7 text-white/50">
            This page doesn&apos;t exist.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild variant={"secondary"}>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
