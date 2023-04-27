import react from "react";
import UserPosts from "./UserPosts";
import UserMessages from "./UserMessages";


const UserProfile = (props) => {
    const { storedToken, storedUser } = props;

    // console.log(storedToken)
    // console.log(storedUser)
    return (
        <>
            {storedToken
                ?
                <>
                    <h1>User Profile</h1>
                    <p>Username: {storedUser.username}</p>
                    <hr />
                    <UserPosts storedUser={storedUser} />
                    <UserMessages storedUser={storedUser} />
                </>
                :
                <span>Login to see your profile</span>
            }
        </>
    )
}

export default UserProfile;