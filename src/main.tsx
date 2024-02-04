import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRouter } from "Routers";
import { MantineProvider } from "@mantine/core";
import { appTheme } from "theme";
import { attachCustomVH } from "localboast";
import { Notifications } from "@mantine/notifications";

// Set up custom VH + resize detection so mobile sizes correctly
attachCustomVH();

const router = createBrowserRouter(RootRouter);

let appContent = (
  <MantineProvider theme={appTheme} defaultColorScheme="auto">
    <Notifications />
    <RouterProvider router={router} />
  </MantineProvider>
);

const ENABLE_STRICT_MODE = false;

if (ENABLE_STRICT_MODE) {
  appContent = <React.StrictMode>{appContent}</React.StrictMode>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(appContent);
