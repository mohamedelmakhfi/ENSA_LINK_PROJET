import { useState } from "react";
import ReportedPosts from "../moderator/ReportedPosts";
import MembersList from "../moderator/MembersList";
import BannerMembersList from "../moderator/BannerMembersList";

const MainSection = () => {
  const [activeTab, setActiveTab] = useState("Reported Posts");

  return (
    <div className="flex flex-col p-3 bg-gray-900">
      <ul className="flex flex-col md:flex-row border-b border-gray-700">
        <li
          className={`${
            activeTab === "Reported Posts"
              ? "bg-primary rounded-tl rounded-tr text-white"
              : "text-gray-500 hover:text-gray-700"
          } flex-1 cursor-pointer text-center p-3 font-medium`}
          onClick={() => setActiveTab("Reported Posts")}
        >
          Reported Posts
        </li>
        <li
          className={`${
            activeTab === "Members"
              ? "bg-primary text-white"
              : "text-gray-500 hover:text-gray-700"
          } flex-1 cursor-pointer text-center p-3 font-medium`}
          onClick={() => setActiveTab("Members")}
        >
          Members
        </li>

        <li
          className={`${
            activeTab === "Banned Users"
              ? "bg-primary rounded-bl rounded-br text-white"
              : "text-gray-500 hover:text-gray-700"
          } flex-1 cursor-pointer text-center p-3 font-medium`}
          onClick={() => setActiveTab("Banned Users")}
        >
          Banned Users
        </li>
      </ul>
      <div className="mt-4 flex flex-col gap-4">
        {activeTab === "Reported Posts" && <ReportedPosts />}
        {activeTab === "Members" && <MembersList />}
        {activeTab === "Banned Users" && <BannerMembersList />}
      </div>
    </div>
  );
};

export default MainSection;
