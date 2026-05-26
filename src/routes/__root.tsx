import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootLayout } from "@/layout/root-layout";

function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export const Route = createRootRoute({ component: Root });
