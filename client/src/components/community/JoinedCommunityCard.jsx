import { Link } from "react-router-dom";

const JoinedCommunityCard = ({ community }) => {
  return (
    <Link
      to={`/community/${community.name}`}
      className="flex flex-col mb-5 bg-gray-800 w-full px-4 py-4 border border-gray-700 shadow-2xl rounded-md"
    >
      <img className="" src={community.banner} alt="" loading="lazy" />
      <h3 className="text-lg font-semibold text-white mb-2">{community.name}</h3>
      <p className="text-gray-400 mb-2">{community.members.length} members</p>
    </Link>
  );
};

export default JoinedCommunityCard;
