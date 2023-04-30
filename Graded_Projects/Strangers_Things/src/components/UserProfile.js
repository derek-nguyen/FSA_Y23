// import react from "react";
import UserPosts from "./UserPosts";
import UserMessages from "./UserMessages";


const UserProfile = (props) => {
    const { storedToken, storedUser } = props;

    return (
        <>
            {storedToken
                ?
                <>
                    <h1 className="user-profile-title">User Profile</h1>
                    <div className="user-profile-info">
                        <p>Username: {storedUser.username}</p>
                    </div>
                    <hr />
                    <UserPosts storedUser={storedUser} />
                    <UserMessages storedUser={storedUser} />
                </>
                :
                <span className="notice">Login to see your profile</span>
            }
        </>
    )
}

export default UserProfile;