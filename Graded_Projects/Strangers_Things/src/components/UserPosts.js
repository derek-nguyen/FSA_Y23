import react from "react";

const UserPosts = (props) => {
    const { storedUser } = props;

    // console.log(storedUser)

    return (
        <>  <h2>Your Posts</h2>
            {
                storedUser.posts.map(
                    ({ _id, title, description, price, createdAt }) => (
                        <>
                            <div>
                                <p>Title: {title}</p>
                                <p>Description: {description}</p>
                                <p>Price: {price}</p>
                            </div>
                            <hr></hr>
                        </>
                    )
                )
            }
        </>
    )
}

export default UserPosts;