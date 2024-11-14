import Wrapper from "../../layout/Wrapper/wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </QueryClientProvider>
  );
}

export default App;
