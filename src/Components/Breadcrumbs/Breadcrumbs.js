import { useLocation } from "react-router-dom";
import "./breadcrumbs.css";

const Breadcrumbs = ({ userName = "[Name]" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const currentPage = pathnames[pathnames.length - 1] || "Dashboard";

  const formatTitle = (title) => {
    return decodeURIComponent(title)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getTitle = () => {
    if (location.pathname === "/home") {
      return `Welcome, Coach ${userName}`;
    }
    return formatTitle(currentPage);
  };

  return <h1 className="app-page-title">{getTitle()}</h1>;
};

export default Breadcrumbs;