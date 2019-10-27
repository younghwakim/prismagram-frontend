import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
const FollowButtonContainer = ({ isFollowing, id }) => {
    const [isFollowingS, setIsFollowing] = useState(isFollowing);
    const [followMutataion] = useMutation(FOLLOW, { variables: { id } });
    const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });
    const onClick = () => {
        setIsFollowing(!isFollowingS);
        if(isFollowingS) {
            unfollowMutation();
        } else {
            followMutataion();
        }
    };
    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

export default FollowButtonContainer;