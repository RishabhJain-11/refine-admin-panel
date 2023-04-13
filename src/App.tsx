import { Refine } from "@refinedev/core";
import { ReadyPage, notificationProvider } from "@refinedev/antd";
import Layout from "antd/es/layout/layout";
// import { ReadyPage } from "@refinedev/antd";
import { ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import "@refinedev/antd/dist/reset.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent/>}
      routerProvider={RouterProvider}
    />
  )
}

export default App;