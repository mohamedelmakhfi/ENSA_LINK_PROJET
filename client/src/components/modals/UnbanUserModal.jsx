import { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import {
  getComMembersAction,
  unbanUserAction,
} from "../../redux/actions/communityActions";

const UnbanUserModal = ({ show, onClose, userId, communityName }) => {
  const [unbanning, setUnbanning] = useState(false);
  const dispatch = useDispatch();

  const unbanHandler = async () => {
    setUnbanning(true);
    await dispatch(unbanUserAction(communityName, userId));
    await dispatch(getComMembersAction(communityName));
    setUnbanning(false);
    onClose();
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        show ? "bg-black bg-opacity-50" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 rounded-md p-4 max-w-md w-full">
          <div className="text-center">
            <h3 className="text-lg leading-6 font-medium text-white">
              Unban User
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-300">
                The user will be unbanned from this community and will be able
                to join again. Are you sure you want to unban this user?
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 flex justify-center space-x-2">
            <button
              disabled={unbanning}
              onClick={onClose}
              className="w-1/2 rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Cancel
            </button>
            <button
              disabled={unbanning}
              onClick={unbanHandler}
              className="w-1/2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              {unbanning ? (
                <LoadingSpinner loadingText={"Unbanning..."} />
              ) : (
                <span>Unban User</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnbanUserModal;
