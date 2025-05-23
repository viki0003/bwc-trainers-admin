import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/layout";
import TrainersLogin from "../Pages/TrainersLogin/TrainersLogin";
import TrainersCreateAccount from "../Pages/TrainersCreateAccount/TrainersCreateAccount";
import TrainersHome from "../Pages/TrainersHome/TrainersHome";
import MySessions from "../Pages/MySessions/MySessions";
import Notifications from "../Pages/Notifications/Notifications";
import Profile from "../Pages/Profile/Profile";
import Availability from "../Pages/Availability/Availability";

const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<TrainersHome />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<TrainersLogin />} />
      <Route
        path="/trainers-create-account"
        element={<TrainersCreateAccount />}
      />
    </Routes>
  );
};

export default Routing;
