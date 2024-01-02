import axios from 'axios';
import config from "../config";

const apiEndpoint = config.apiEndpoint;

axios.defaults.withCredentials = true

async function getAllProfile() {
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
    

async function submitTask(taskData) {
    const url = config.apiEndpoint + '/task';

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

export default {
    getAllProfile,
    postResume,
    getAllService,
    getAllTask,
    submitTask,
    loginService,
    submitRegister,
};