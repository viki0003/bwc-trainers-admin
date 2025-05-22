import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

const Layout = () => {
  return (
    <div className="ui-layout">
      <Header />
      <div className="render-output">
        <div className="app-container">
          <div className="app-sidebar">
            <Sidebar />
          </div>
          <div className="app-content">
            <div className="app-content-breadcrumb p-4">
              <Breadcrumbs />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
