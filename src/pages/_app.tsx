import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import { TodoProvider } from "@/contexts/TodoContext/TodoContext";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default MyApp;
