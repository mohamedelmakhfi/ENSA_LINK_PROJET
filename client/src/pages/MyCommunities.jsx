import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJoinedCommunitiesAction } from "../redux/actions/communityActions";
import JoinedCommunityCard from "../components/community/JoinedCommunityCard";
import CommonLoading from "../components/loader/CommonLoading";

const MyCommunities = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getJoinedCommunitiesAction());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const communityCards = useMemo(() => {
    if (!joinedCommunities) {
      return null;
    }
    return joinedCommunities.map((community) => (
      <div key={community._id} className="main-section flex items-center">
        <JoinedCommunityCard className="mb-5" community={community} />
      </div>
    ));
  }, [joinedCommunities]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <CommonLoading />
      </div>
    );
  }

  return <div className="main-section bg-gray-800 text-white">{communityCards}</div>;
};

export default MyCommunities;
