import axios from "axios";


export const oauthService = async () =>{
    try {
        const params = {
            client_id: '736879575540-bst9aicv0rh9kf55l2dp2m1v15bu5pt3.apps.googleusercontent.com',
            response_type: 'code',
            scope: 'profile email',
            access_type: 'offline',
            prompt: 'consent',
            redirect_uri: 'http://localhost:8080/login',
        }
        const urlParams = new URLSearchParams(params).toString();
        window.location = `https://accounts.google.com/o/oauth2/auth?${urlParams}`;
    }catch (error) {
        console.error(error)
    }
}

export const getAccessToken = async (code) => {
    try {
        const data = {
            code: code,
            client_id: '736879575540-bst9aicv0rh9kf55l2dp2m1v15bu5pt3.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: 'http://localhost:8080/login',
            grant_type: 'authorization_code',
        }
        const response = await axios.post('https://oauth2.googleapis.com/token', data);
        localStorage.setItem('token', response.data.access_token);
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const getProfile = async () => {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const getLocalToken = () => {
    return localStorage.getItem('token')
}