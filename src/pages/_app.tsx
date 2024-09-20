import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import TodoProvider from "@/contexts/TodoContext/todoContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  );
};

export default MyApp;
