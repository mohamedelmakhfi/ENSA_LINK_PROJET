const TopicConflictModal = ({
  communityName,
  closeTopicConflictModal,
  showTopicConflictModal,
  recommendedCommunity,
}) => {
  const handleClose = () => {
    if (showTopicConflictModal) {
      closeTopicConflictModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-y-auto transition-opacity duration-300 ${
        showTopicConflictModal ? "opacity-100 z-50" : "opacity-0 hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full md:w-96 relative z-10">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4 text-white">Important Message</h2>
          <hr className="border-t-2 border-gray-600 mb-6" />
          <p className="text-gray-300 mb-6">
            Hello! We've noticed that your post in the{" "}
            <strong className="text-primary">{communityName}</strong> community may not be the best fit for that audience. However, we believe it would be a great fit for the <strong className="text-primary">{recommendedCommunity}</strong> community!
          </p>

          <button
            className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            onClick={handleClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicConflictModal;
