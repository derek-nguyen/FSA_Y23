import react, { useEffect } from "react";
import { fetchFromAPI } from "../utilities/apiClient";

const UserProfile = (props) => {
    const { storedToken, storedUser } = props;

    return (
        <>
            <h1>User Profile</h1>
        </>
    )
}

export default UserProfile;