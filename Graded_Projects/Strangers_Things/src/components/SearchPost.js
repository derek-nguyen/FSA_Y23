import react, { useEffect } from "react";

const SearchPost = (props) => {
    const { searchTerm, setSearchTerm, posts, setPosts, fetchPosts } = props;

    const postMatches = (post, text) => {
        if (post.title.includes(text)) {
            return true
        }
    }

    // const filteredPosts = posts.filter(post => postMatches(post, searchTerm))
    // console.log(filteredPosts)


    return (
        <>
            <form onSubmit={postMatches}>
                <input
                    type="text"
                    placeholder="Search for a post"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                >
                </input>
                <button>Search</button>
            </form>
        </>
    )
}

export default SearchPost;