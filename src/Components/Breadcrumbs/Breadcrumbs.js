import { useLocation } from "react-router-dom";
import "./breadcrumbs.css";
import { useTrainerAccounts } from "../../APIContext/TrainerAccountContext";

const Breadcrumbs = () => {
  const location = useLocation();
  const { trainer } = useTrainerAccounts();

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
      const coachName = trainer
        ? `${trainer.user.first_name} ${trainer.user.last_name}`
        : "[Name]";
      return `Welcome, Coach ${coachName}`;
    }
    return formatTitle(currentPage);
  };

  return <h1 className="app-page-title">{getTitle()}</h1>;
};

export default Breadcrumbs;
