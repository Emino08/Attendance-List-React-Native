import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.199.61:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    adapter: 'fetch',
});

export const setAuthToken = async () => {
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        console.log("Setting auth token: ", user.token);
        api.defaults.headers.common['Authorization'] = `Token ${user.token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Call setAuthToken on app start and after login/logout
setAuthToken();

const getAuthHeader = async () => {
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        return { 'Authorization': `Token ${user.token}` };
    }
    return {};
};

export const login = async (username, password) => {
    const response = await api.post('login/', { username, password });
    const { token, user: userData } = response.data;

    const userDetailsResponse = await api.get(`users/${userData.id}/`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    const userDetails = userDetailsResponse.data;

    const completeUserData = {
        ...userData,
        ...userDetails,
        token
    };

    await AsyncStorage.setItem('user', JSON.stringify(completeUserData));
    await setAuthToken();

    return {
        success: true,
        requiresPasswordChange: !completeUserData.is_password_changed,
        user: completeUserData
    };
};

export const changePassword = async (newPassword) => {
    const headers = await getAuthHeader();
    const response = await api.post('change-password/', { new_password: newPassword }, { headers });
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        const updatedUser = { ...user, is_password_changed: true };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
};

export const logout = async () => {
    await AsyncStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
};

export const getUsers = async () => {
    const headers = await getAuthHeader();
    return api.get('users/', { headers });
};

export const createUser = async (userData) => {
    const headers = await getAuthHeader();
    return api.post('users/', userData, { headers });
};

export const updateUser = async (id, userData) => {
    const headers = await getAuthHeader();
    return api.put(`users/${id}/`, userData, { headers });
};

export const deleteUser = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`users/${id}/`, { headers });
};

export const getUserRoles = async () => {
    const headers = await getAuthHeader();
    return api.get('user-roles/', { headers });
};

export const getYears = async () => {
    const headers = await getAuthHeader();
    return api.get('years/', { headers });
};

export const createYear = async (yearData) => {
    const headers = await getAuthHeader();
    return api.post('years/', yearData, { headers });
};

export const updateYear = async (id, yearData) => {
    const headers = await getAuthHeader();
    return api.put(`years/${id}/`, yearData, { headers });
};

export const deleteYear = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`years/${id}/`, { headers });
};

export const getPrograms = async () => {
    const headers = await getAuthHeader();
    return api.get('programs/', { headers });
};

export const createProgram = async (programData) => {
    const headers = await getAuthHeader();
    return api.post('programs/', programData, { headers });
};

export const updateProgram = async (id, programData) => {
    const headers = await getAuthHeader();
    return api.put(`programs/${id}/`, programData, { headers });
};

export const deleteProgram = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`programs/${id}/`, { headers });
};

export const getModules = async () => {
    const headers = await getAuthHeader();
    return api.get('modules/', { headers });
};

export const createModule = async (moduleData) => {
    const headers = await getAuthHeader();
    return api.post('modules/', moduleData, { headers });
};

export const updateModule = async (id, moduleData) => {
    const headers = await getAuthHeader();
    return api.put(`modules/${id}/`, moduleData, { headers });
};

export const deleteModule = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`modules/${id}/`, { headers });
};

export const getStudents = async () => {
    const headers = await getAuthHeader();
    return api.get('students/', { headers });
};

export const createStudent = async (studentData) => {
    const headers = await getAuthHeader();
    return api.post('students/', studentData, { headers });
};

export const updateStudent = async (id, studentData) => {
    const headers = await getAuthHeader();
    return api.put(`students/${id}/`, studentData, { headers });
};

export const deleteStudent = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`students/${id}/`, { headers });
};

export const getLecturers = async () => {
    const headers = await getAuthHeader();
    return api.get('lecturers/', { headers });
};

export const createLecturer = async (lecturerData) => {
    const headers = await getAuthHeader();
    return api.post('lecturers/', {
        ...lecturerData,
        modules: lecturerData.modules}, { headers });
};

export const updateLecturer = async (id, lecturerData) => {
    const headers = await getAuthHeader();
    return api.put(`lecturers/${id}/`, {
        ...lecturerData,
        modules: lecturerData.modules}, { headers });
};

export const deleteLecturer = async (id) => {
    const headers = await getAuthHeader();
    return api.delete(`lecturers/${id}/`, { headers });
};

export const getStudentAttendance = async () => {
    const headers = await getAuthHeader();
    return api.get('student-attendance/', { headers });
};

export const markStudentAttendance = async (attendanceData) => {
    const headers = await getAuthHeader();
    return api.post('student-attendance/', attendanceData, { headers });
};

export const getLecturerAttendance = async () => {
    const headers = await getAuthHeader();
    return api.get('lecturer-attendance/', { headers });
};

export const markLecturerAttendance = async (attendanceData) => {
    const headers = await getAuthHeader();
    return api.post('lecturer-attendance/', attendanceData, { headers });
};

export default api;
