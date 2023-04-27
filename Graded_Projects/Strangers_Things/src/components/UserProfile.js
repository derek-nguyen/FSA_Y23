import react from "react";
import UserPosts from "./UserPosts";

const UserProfile = (props) => {
    const { storedToken, storedUser } = props;

    // console.log(storedToken)
    // console.log(storedUser)
    return (
        <>
            <h1>User Profile</h1>
            <p>Username: {storedUser.username}</p>
            <hr/>
            <UserPosts storedUser={storedUser}/>
        </>
    )
}

export default UserProfile;