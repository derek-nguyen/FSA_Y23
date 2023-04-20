/* 
API documentation: https://strangers-things.herokuapp.com/api/#api-url-format


*/

const COHORT_NAME = '2301-FTB-PT-WEB-PT'

export const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export const API_OBJECTS = {
    Users: {
        register: '/users/register',
        login: '/users/login',
        me:'/users/me',
    },
    Posts: {
        getPost: '/posts',
        postPosts: '/posts',
        patchPosts: '/posts/', // need to append POST_ID
        deletePosts: '/posts/' // need to append POST_ID  
    }
}

// export const userAuthentication = async (actionType, options) {
//     const result = await fetch()
// }