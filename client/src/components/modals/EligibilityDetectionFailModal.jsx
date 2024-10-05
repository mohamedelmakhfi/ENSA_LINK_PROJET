import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  confirmPostAction,
  rejectPostAction,
} from "../../redux/actions/postActions";

const EligibilityDetectionFailModal = ({
  closeEligibilityDetectionFailModal,
  showEligibilityDetectionFailModal,
  confirmationToken,
}) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDiscard = async () => {
    setIsProcessing(true);
    await dispatch(rejectPostAction(confirmationToken));
    setIsProcessing(false);
    closeEligibilityDetectionFailModal();
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    await dispatch(confirmPostAction(confirmationToken));
    setIsProcessing(false);
    closeEligibilityDetectionFailModal();
  };

  const modalClass = showEligibilityDetectionFailModal
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "hidden";

  return (
    <div className={modalClass}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="z-10 mx-auto max-w-md rounded-md bg-gray-800 p-8 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Unable to Determine Post Eligibility
          </h2>
          <p className="mb-4 text-gray-300">
            We apologize, but our system couldn't determine the eligibility of
            your post for this community. You can still proceed with posting it
            if you believe it's relevant. Community moderators may remove posts
            that don't align with guidelines, potentially resulting in a ban.
            Thank you for understanding.
          </p>
          <div className="flex justify-end">
            <button
              className="focus:shadow-outline mr-4 rounded bg-gray-600 px-4 py-2 text-sm text-gray-200 hover:bg-gray-500 focus:outline-none"
              onClick={handleDiscard}
              disabled={isProcessing}
            >
              Discard
            </button>
            <button
              className={`focus:shadow-outline rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:outline-none ${
                isProcessing ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleProcess}
              disabled={isProcessing}
            >
              {isProcessing ? "Posting..." : "Post Anyway"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityDetectionFailModal;
