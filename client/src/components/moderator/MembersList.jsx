import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComMembersAction } from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import BanUserModal from "../modals/BanUserModal";
import { CiLocationOn } from "react-icons/ci";
import { IoTimerOutline } from "react-icons/io5";

const MembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  const [banUserModalVisibility, setBanUserModalVisibility] = useState({});
  const toggleBanUserModal = (userId, visible) => {
    setBanUserModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: visible,
    }));
  };

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const communityMembers = useSelector(
    (state) => state.moderation?.communityMembers
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {communityMembers && communityMembers.length === 0 && (
          <p className="text-center text-gray-500 font-semibold">
            No members to show
          </p>
        )}
        {communityMembers &&
          communityMembers.map((member) => {
            const modalVisible = banUserModalVisibility[member._id] || false;
            return (
              <div
                key={member._id}
                className="flex flex-col bg-gray-800 border border-gray-700 px-6 py-3 my-3 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <img
                      src={member.avatar}
                      alt="profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col ml-2">
                      <Link
                        to={`/user/${member._id}`}
                        className="font-bold text-white"
                      >
                        {member.name}
                      </Link>
                      <p className="text-xs flex items-center gap-1 text-gray-300">
                        <CiLocationOn />
                        {member.location}
                      </p>
                      <p className="text-xs flex items-center gap-1 text-gray-300">
                        <IoTimerOutline />
                        {new Date(member.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toggleBanUserModal(member._id, true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg px-4 py-2 h-9 flex justify-center items-center text-sm"
                  >
                    Ban user
                  </button>
                </div>

                {modalVisible && (
                  <BanUserModal
                    key={member._id}
                    show={modalVisible}
                    onClose={() => {
                      toggleBanUserModal(member._id, false);
                    }}
                    userId={member._id}
                    communityName={communityName}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(MembersList);
