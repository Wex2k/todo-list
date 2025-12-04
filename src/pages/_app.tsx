import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import { TodoProvider } from "@/contexts/TodoContext/TodoContext";
import { ThemeProvider } from "@/providers/ThemeProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default MyApp;
