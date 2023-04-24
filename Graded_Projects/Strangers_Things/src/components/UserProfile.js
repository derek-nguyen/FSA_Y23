import react, { useEffect } from "react";
import { fetchFromAPI } from "../utilities/apiClient";

const UserProfile = (props) => {
    const { storedToken } = props;

    const fetchUserProfile = async () => {
        const data = await fetchFromAPI({
            endpoint: 'me',
            token: storedToken,
        })
        localStorage.setItem('user',JSON.stringify(data))
    }

    useEffect(() => {
        fetchUserProfile();
    }, [])

    return (
        <>
            <h1>User Profile</h1>
        </>
    )
}

export default UserProfile;