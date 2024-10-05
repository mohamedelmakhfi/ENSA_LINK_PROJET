import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/adminActions";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import { BiLogOut } from "react-icons/bi";
import { BsPeople, BsWindowStack } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const Tab = ({ activeTab, handleTabClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logoutAction()).then(() => {
      navigate("/admin/signin");
    });
    setLoggingOut(false);
  };

  return (
    <div className="border-b border-gray-700 sticky top-0 left-0 z-30 bg-gray-800 rounded-md">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-300">
        <li className="mr-2 flex items-center">
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === "logs"
                ? "border-blue-500 bg-primary-dark rounded-md text-white"
                : "border-transparent hover:text-gray-400 hover:border-gray-400"
            }`}
            onClick={() => handleTabClick("logs")}
          >
            <BsWindowStack className="mr-1" />
            Logs
          </span>
        </li>
        <li className="mr-2 flex items-center">
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === "settings"
                ? "border-blue-500 bg-primary-dark rounded-md text-white"
                : "border-transparent hover:text-gray-400 hover:border-gray-400"
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <IoSettingsOutline className="mr-1" />
            Settings
          </span>
        </li>
        <li className="mr-2 flex items-center">
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-lg ${
              activeTab === "Community Management"
                ? "border-blue-500 bg-primary-dark rounded-md text-white"
                : "border-transparent hover:text-gray-400 hover:border-gray-400"
            }`}
            onClick={() => handleTabClick("Community Management")}
          >
            <BsPeople className="mr-1" />
            Community Management
          </span>
        </li>
        <li className="mr-2 flex items-center">
          <span
            className={`cursor-pointer inline-flex items-center px-2 py-2 border-b-2 rounded-t-md ${
              activeTab === "logout"
                ? "border-blue-500 bg-primary-dark rounded-md text-white"
                : "border-transparent hover:text-red-500 hover:border-red-500"
            }`}
            onClick={handleLogout}
          >
            <BiLogOut className="mr-1" />
            <span
              className={`${
                activeTab === "logout"
                  ? "group-hover:text-gray-400"
                  : "group-hover:text-red-500"
              }`}
            >
              {loggingOut ? (
                <ButtonLoadingSpinner loadingText={"Logging out..."} />
              ) : (
                "Logout"
              )}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
