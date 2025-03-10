import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import PropTypes from "prop-types";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu}></Navbar>
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu}></SideMenu>
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.string,
};

export default DashboardLayout;
