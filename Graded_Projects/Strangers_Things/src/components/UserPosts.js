import react from "react";

const UserPosts = (props) => {
    const { storedUser } = props;

    // console.log(storedUser)

    return (
        <> 
            <h2>Your Active Posts</h2>
            {
                storedUser.posts.map(
                    ({ _id, title, description, price, active, messages }) => (
                        <>
                            {active && (
                                <>
                                    <div key={_id} className="posts">
                                        <p>Title: {title}</p>
                                        <p>Description: {description}</p>
                                        <p>Price: {price}</p>
                                        <br />
                                        <p>Messages received: {messages.length}</p>
                                    </div>
                                    <hr />
                                </>
                            )}
                        </>
                    )
                )
            }
        </>
    )
}

export default UserPosts;