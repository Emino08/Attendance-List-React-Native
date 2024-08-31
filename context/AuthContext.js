// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
//
// const AuthContext = createContext();
//
// const API_URL = 'http://192.168.199.61:8000';  // Replace with your actual API URL
//
// axios.create({
//     adapter: 'fetch',
// });
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         checkStoredUser();
//     }, []);
//
//     const checkStoredUser = async () => {
//         try {
//             const storedUser = await AsyncStorage.getItem('user');
//             if (storedUser) {
//                 setUser(JSON.parse(storedUser));
//             }
//         } catch (error) {
//             console.error('Failed to get stored user', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const login = async (username, password) => {
//         try {
//             // Step 1: Login and get token
//             const loginResponse = await axios.post(`${API_URL}/api/login/`, { username, password }, {
//                 headers: { 'Content-Type': 'application/json' }
//             });
//             const { token, user: userData } = loginResponse.data;
//
//             // Step 2: Fetch user details including role
//             const userDetailsResponse = await axios.get(`${API_URL}/api/users/${userData.id}/`, {
//                 headers: { 'Authorization': `Token ${token}` }
//             });
//             const userDetails = userDetailsResponse.data;
//
//             // Combine user data
//             const completeUserData = {
//                 ...userData,
//                 ...userDetails,
//                 token
//             };
//
//             await AsyncStorage.setItem('user', JSON.stringify(completeUserData));
//             setUser(completeUserData);
//
//             console.log('Login successful:', completeUserData);
//
//             return {
//                 success: true,
//                 requiresPasswordChange: !completeUserData.is_password_changed
//             };
//         } catch (error) {
//             console.log('Login failed', error);
//             console.log('Error message:', error.message);
//             console.log('Error response:', error.response);
//             return { success: false, requiresPasswordChange: false };
//         }
//     };
//     const changePassword = async (newPassword) => {
//         try {
//             await axios.post(`${API_URL}/api/change-password/`, { new_password: newPassword }, {
//                 headers: { Authorization: `Bearer ${user.token}` }
//             });
//             const updatedUser = { ...user, is_password_changed: true };
//             await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
//             setUser(updatedUser);
//             return true;
//         } catch (error) {
//             console.error('Password change failed', error);
//             return false;
//         }
//     };
//
//     const logout = async () => {
//         await AsyncStorage.removeItem('user');
//         setUser(null);
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);
//
// // // context/AuthContext.js
// //
// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';
// //
// // const AuthContext = createContext();
// //
// // const API_URL = 'http://192.168.199.61:8000';  // Replace with your actual API URL
// //
// // axios.create({
// //     adapter: 'fetch',
// // });
// // export const AuthProvider = ({ children }) => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //
// //     useEffect(() => {
// //         checkStoredUser();
// //     }, []);
// //
// //     const checkStoredUser = async () => {
// //         try {
// //             const storedUser = await AsyncStorage.getItem('user');
// //             if (storedUser) {
// //                 setUser(JSON.parse(storedUser));
// //             }
// //         } catch (error) {
// //             console.error('Failed to get stored user', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     const login = async (username, password) => {
// //         try {
// //             const response = await axios.post(`${API_URL}/api/login/`, { username, password }, {
// //                 headers: { 'Content-Type': 'application/json' }
// //             });
// //             const userData = response.data;
// //             console.log('Login successful:', userData)
// //             await AsyncStorage.setItem('user', JSON.stringify(userData));
// //             setUser(userData);
// //             return true;
// //         } catch (error) {
// //             // Log the error details
// //             console.log('Error message:', error.message);
// //             console.log('Error code:', error.code);
// //             console.log('Error response:', error.response); // This will contain the response from the server if available
// //             console.log('Error config:', error.config);
// //             console.log('Login failed', error);
// //             return false;
// //         }
// //     };
// //
// //     const changePassword = async (newPassword) => {
// //         try {
// //             await axios.post(`${API_URL}/api/change-password/`, { new_password: newPassword }, {
// //                 headers: { Authorization: `Bearer ${user.token}` }
// //             });
// //             const updatedUser = { ...user, is_password_changed: true };
// //             await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
// //             setUser(updatedUser);
// //             return true;
// //         } catch (error) {
// //             console.error('Password change failed', error);
// //             return false;
// //         }
// //     };
// //
// //     const logout = async () => {
// //         await AsyncStorage.removeItem('user');
// //         setUser(null);
// //     };
// //
// //     return (
// //         <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };
// //
// // export const useAuth = () => useContext(AuthContext);
// // // context/AuthContext.js
// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // import * as LocalAuthentication from 'expo-local-authentication';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// //
// // const AuthContext = createContext();
// //
// // export const AuthProvider = ({ children }) => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //
// //     useEffect(() => {
// //         // Check for stored user data on app start
// //         checkStoredUser();
// //     }, []);
// //
// //     const checkStoredUser = async () => {
// //         try {
// //             const storedUser = await AsyncStorage.getItem('user');
// //             if (storedUser) {
// //                 setUser(JSON.parse(storedUser));
// //             }
// //         } catch (error) {
// //             console.error('Failed to get stored user', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     const login = async (email, password) => {
// //         // Dummy authentication
// //         const dummyUsers = [
// //             { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
// //             { id: 2, email: 'lecturer@example.com', password: 'lecturer123', role: 'lecturer' },
// //             { id: 3, email: 'student@example.com', password: 'student123', role: 'student' },
// //         ];
// //
// //         console.log('Attempting login with:', { email, password });
// //         const user = dummyUsers.find(u => u.email === email && u.password === password);
// //
// //         if (user) {
// //             console.log('User found:', user);
// //             const { password, ...userWithoutPassword } = user;
// //             await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
// //             setUser(userWithoutPassword);
// //             return true;
// //         }
// //         console.log('Login failed: No matching user found');
// //         return false;
// //     };
// //
// //     const logout = async () => {
// //         await AsyncStorage.removeItem('user');
// //         setUser(null);
// //     };
// //
// //     // const authenticateWithFingerprint = async () => {
// //     //     const hasHardware = await LocalAuthentication.hasHardwareAsync();
// //     //     if (!hasHardware) {
// //     //         throw new Error('Device does not support fingerprint authentication');
// //     //     }
// //     //
// //     //     const isEnrolled = await LocalAuthentication.isEnrolledAsync();
// //     //     if (!isEnrolled) {
// //     //         throw new Error('No fingerprints enrolled on this device');
// //     //     }
// //     //
// //     //     const result = await LocalAuthentication.authenticateAsync({
// //     //         promptMessage: 'Authenticate with fingerprint',
// //     //         fallbackLabel: 'Use password',
// //     //     });
// //     //
// //     //     return result.success;
// //     // };
// //
// //     return (
// //         <AuthContext.Provider value={{ user, login, logout, loading }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };
// //
// // export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReactNativeBiometrics from 'react-native-biometrics';

const AuthContext = createContext();

const API_URL = 'http://192.168.199.61:8000';  // Replace with your actual API URL

axios.create({
    adapter: 'fetch',
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkStoredUser();
    }, []);

    const checkStoredUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to get stored user', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            // Step 1: Login and get token
            const loginResponse = await axios.post(`${API_URL}/api/login/`, { username, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { token, user: userData } = loginResponse.data;

            // Step 2: Fetch user details including role
            const userDetailsResponse = await axios.get(`${API_URL}/api/users/${userData.id}/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            const userDetails = userDetailsResponse.data;

            // Combine user data
            const completeUserData = {
                ...userData,
                ...userDetails,
                token
            };

            await AsyncStorage.setItem('user', JSON.stringify(completeUserData));
            setUser(completeUserData);

            console.log('Login successful:', completeUserData);

            return {
                success: true,
                requiresPasswordChange: !completeUserData.is_password_changed
            };
        } catch (error) {
            console.log('Login failed', error);
            console.log('Error message:', error.message);
            console.log('Error response:', error.response);
            return { success: false, requiresPasswordChange: false };
        }
    };

    const fingerprintLogin = async () => {
        try {
            const rnBiometrics = new ReactNativeBiometrics();
            const { available, biometryType } = await rnBiometrics.isSensorAvailable();

            console.log('Biometric sensor available:', available, 'Type:', biometryType)
            if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
                if (success) {
                    console.log('Fingerprint authentication successful')
                    // Implement your server-side authentication here
                    // For demonstration, we'll just retrieve the stored user
                    const storedUser = await AsyncStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                        return { success: true, requiresPasswordChange: false };
                    }
                }
            }
            return { success: false, requiresPasswordChange: false };
        } catch (error) {
            console.error('Fingerprint login failed', error);
            return { success: false, requiresPasswordChange: false };
        }
    };

    const changePassword = async (newPassword) => {
        try {
            await axios.post(`${API_URL}/api/change-password/`, { new_password: newPassword }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const updatedUser = { ...user, is_password_changed: true };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return true;
        } catch (error) {
            console.error('Password change failed', error);
            return false;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, fingerprintLogin, logout, changePassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);