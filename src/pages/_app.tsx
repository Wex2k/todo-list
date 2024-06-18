import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import TodoProvider from "@/contexts/todoContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    <TodoProvider>
      <Component {...pageProps} />
      <Analytics />
    </TodoProvider>
    </>
  );
};

export default MyApp;
