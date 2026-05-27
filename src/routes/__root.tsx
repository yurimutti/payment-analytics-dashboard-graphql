import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootLayout } from "@/shared/layout/root-layout";

function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export const Route = createRootRoute({ component: Root });
