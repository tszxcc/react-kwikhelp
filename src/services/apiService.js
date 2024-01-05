import axios from 'axios';
import config from "../config";

axios.defaults.withCredentials = true

async function getProfile() {
    const url = config.apiEndpoint + `/profile`;
    
    const response = await axios.get(url);
    return response;
}

async function saveProfile(data) {
    const url = config.apiEndpoint + `/profile`;

    const response = await axios.post(url);
    return response;
}

async function postResume() {
    const url = config.apiEndpoint + `/resume`;
    
    const response = await axios.post(url);
    return response;
}

async function getAllService() {
    const url = config.apiEndpoint + `/service`;
    
    const response = await axios.get(url);
    return response;

}

async function getAllTask() {
    const url = config.apiEndpoint + `/task`;
    
    const response = await axios.get(url);
    return response;

}

async function getUserTask() {
    const url = config.apiEndpoint + `/task/user`;
    
    const response = await axios.get(url);
    return response;
}

async function deleteUserTask(taskId) {
    const url = config.apiEndpoint + `/task/${taskId}`;
    
    const response = await axios.delete(url);
    return response;

}
    
async function submitTask(taskData) {
    const url = config.apiEndpoint + '/task/create';

    try {
        const response = await axios.post(url,{ taskData });
        return response.data;
    } catch (error) {
        console.error(error.message, error.response?.data);
        return false;
    }

}

async function loginService(values) {
    const url = config.apiEndpoint + '/auth/login';

    try {
        const response = await axios.post(url, values);
        localStorage.setItem('role', response.data);
        return response;
    } catch (error) {
        console.error(error.message, error.response?.data);
        return false;
    }
}

async function submitRegister(values) {
    const url = config.apiEndpoint + '/auth/register';

    try {
        const response = await axios.post(url, values);
        return response;
    } catch (error) {
        console.error(error.message, error.response?.data);
        return false;
    }
}

async function getUserCount() {
    const url = config.apiEndpoint + `/admin/userCount`;
    
    const response = await axios.get(url);
    return response;
}

async function getHelperCount() {
    const url = config.apiEndpoint + `/admin/helperCount`;
    
    const response = await axios.get(url);
    return response;
}

async function getTaskCount() {
    const url = config.apiEndpoint + `/admin/taskCount`;
    
    const response = await axios.get(url);
    return response;
}

async function getTransactionCount() {
    const url = config.apiEndpoint + `/admin/transactionCount`;
    
    const response = await axios.get(url);
    return response;
}

async function getUserRequest() {
    const url = config.apiEndpoint + `/task/userRequests`;
    
    const response = await axios.get(url);
    return response;
}

async function getOneTask(taskId) {
    const url = config.apiEndpoint + `/task/${taskId}`;
    
    const response = await axios.get(url);
    return response;
}

async function acceptTask(taskId, helper) {
    const url = config.apiEndpoint + `/task/accept`;
    
    const response = await axios.post(url, { taskId, helper });
    return response;
}

async function confirmTask(taskId) {
    const url = config.apiEndpoint + `/task/confirm`;
    
    const response = await axios.post(url, { taskId });
    return response;
}

async function payTask(taskId, amount) {
    const url = config.apiEndpoint + `/task/pay`;
    
    const response = await axios.post(url, { taskId, amount });
    return response;
}

async function reviewTask(taskId, rate) {
    const url = config.apiEndpoint + `/task/review`;
    
    const response = await axios.post(url, { taskId, rate });
    return response;
}

async function requestTask(taskId, username) {
    const url = config.apiEndpoint + `/task/request`;
    
    const response = await axios.post(url, { taskId, username });
    return response;
}

async function getHelperRequest() {
    const url = config.apiEndpoint + `/task/helperRequests`;
    
    const response = await axios.get(url);
    return response;
}

async function completeTask(taskId) {
    const url = config.apiEndpoint + `/task/complete`;
    
    const response = await axios.post(url, { taskId });
    return response;
}

async function updateProfile(values) {
    const url = config.apiEndpoint + `/profile`;
    
    const response = await axios.post(url, values);
    return response;

}

async function logout() {
    const url = config.apiEndpoint + `/auth/logout`;
    
    const response = await axios.post(url);

    if (response.status !== 200) return response;
    
    localStorage.removeItem('role');
    window.location.replace('/');
    return response;
}

export default {
    getProfile,
    postResume,
    getAllService,
    getAllTask,
    getUserTask,
    deleteUserTask,
    submitTask,
    loginService,
    submitRegister,
    getUserCount,
    getHelperCount,
    getTaskCount,
    getTransactionCount,
    getUserRequest,
    getOneTask,
    acceptTask,
    confirmTask,
    payTask,
    reviewTask,
    requestTask,
    getHelperRequest,
    completeTask,
    updateProfile,
    logout
};