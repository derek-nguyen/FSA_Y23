/* 
API documentation: https://strangers-things.herokuapp.com/api/#api-url-format


*/

// const COHORT_NAME = '2301-FTB-PT-WEB-PT'

const BASE_API_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT`

const API_ENDPOINTS = {
    register: '/users/register',
    login: '/users/login',
    me: '/users/me',
    posts: '/posts',
    patchPosts: '/posts/', // need to append POST_ID
    deletePosts: '/posts/', // need to append POST_ID 
    sendMessage: '/posts/', // need to append POST_ID + /messages
}

const getURL = (endpoint, postId) => {
    let path = API_ENDPOINTS[endpoint];

    if (!path) {
        throw new Error('Invalid API endpoint specified');
    }

    if (endpoint === 'deletePosts' && postId) {
        path += postId;
    } else if (endpoint === 'sendMessage' && postId) {
        path += postId + '/messages'
    }

    return BASE_API_URL + path;
}

const getOptions = (method, body, token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...(body && { body: JSON.stringify(body) })
});

export const fetchFromAPI = async ({ endpoint, method, body, token}, postId) => {
    try {
        const result = await fetch(
            getURL(endpoint, postId),
            getOptions(method, body, token),
        );
        const response = await result.json();
        if (response.error) throw response.error
        return response?.data;
    } catch (err) {
        console.error(err)
    }
}