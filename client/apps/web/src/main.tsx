import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { configureApi, session } from "@fit-core/shared";
import { tokenStorage, decodeAccessToken } from "./utils/token.ts";

configureApi(
  () => Promise.resolve(tokenStorage.get()),
  {
    // No getRefreshToken — web relies on the HttpOnly cookie sent automatically
    onTokenRefreshed: (newToken) => {
      tokenStorage.set(newToken);
      const payload = decodeAccessToken(newToken);
      if (payload) {
        session.setTokens(newToken, payload.sub, payload.tenantId, payload.role);
      }
    },
    onLogout: () => {
      tokenStorage.remove();
      session.clear();
      window.location.href = "/login";
    },
  },
);

async function bootstrap() {
  // On page reload the access token is gone (in-memory only).
  // Attempt a silent refresh using the HttpOnly cookie — no credentials stored in JS.
  try {
    const res = await fetch("https://localhost:7174/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (res.ok) {
      const data = (await res.json()) as { accessToken: string };
      tokenStorage.set(data.accessToken);
      const payload = decodeAccessToken(data.accessToken);
      if (payload) {
        session.setTokens(data.accessToken, payload.sub, payload.tenantId, payload.role);
      }
    }
    // If refresh fails (no cookie / expired) — proceed unauthenticated;
    // ProtectedAdminRoute will redirect to /login
  } catch {
    // Network error — proceed unauthenticated
  }

  const queryClient = new QueryClient();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
}

bootstrap();
