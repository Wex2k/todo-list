import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title key="404">404</title>
      </Head>

      <main className="bg-background grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-primary text-lg font-semibold">404</p>
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mt-6 text-base leading-7">
            This page doesn&apos;t exist.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild variant="secondary">
              <Link href="/" className="gap-1">
                <ArrowLeft />
                Go back home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
