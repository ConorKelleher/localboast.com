import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRouter } from "Routers";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const router = createBrowserRouter(RootRouter);

let appContent = (
  <MantineProvider theme={theme}>
    <RouterProvider router={router} />
  </MantineProvider>
);

const ENABLE_STRICT_MODE = false;

if (ENABLE_STRICT_MODE) {
  appContent = <React.StrictMode>{appContent}</React.StrictMode>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(appContent);
