// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { updateUser, changePassword, logout as apiLogout } from '../api';
// import CustomButton from '../components/CustomButton';
// import Icon from 'react-native-vector-icons/Ionicons';
// import styles from "../styles";
// import { useAuth } from "../context/AuthContext";
//
// export default function ProfileScreen() {
//     const { logout } = useAuth();
//     const [profile, setProfile] = useState(null);
//     const [oldPassword, setOldPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//
//     useEffect(() => {
//         fetchProfile();
//     }, []);
//
//     const fetchProfile = async () => {
//         try {
//             const userString = await AsyncStorage.getItem('user');
//             if (userString) {
//                 const userData = JSON.parse(userString);
//                 setProfile(userData);
//             }
//         } catch (error) {
//             console.error('Failed to fetch profile', error);
//             Alert.alert('Error', 'Failed to fetch profile. Please try again.');
//         }
//     };
//
//     const handleUpdateProfile = async () => {
//         try {
//             const updatedProfile = {
//                 username: profile.username,
//                 email: profile.email,
//                 first_name: profile.first_name,
//                 last_name: profile.last_name,
//             };
//             await updateUser(profile.id, updatedProfile);
//
//             if (oldPassword && newPassword) {
//                 await changePassword(newPassword);
//                 setOldPassword('');
//                 setNewPassword('');
//             }
//
//             // Update local storage
//             const updatedUserData = { ...profile, ...updatedProfile };
//             await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
//
//             Alert.alert('Success', 'Profile updated successfully.');
//             fetchProfile(); // Refresh profile data
//         } catch (error) {
//             console.error('Failed to update profile', error);
//             Alert.alert('Error', 'Failed to update profile. Please try again.');
//         }
//     };
//
//     const handleLogout = async () => {
//         try {
//             await apiLogout();
//             await logout();
//             // Navigation to login screen should be handled in the AuthContext
//         } catch (error) {
//             console.error('Failed to logout', error);
//             Alert.alert('Error', 'Failed to logout. Please try again.');
//         }
//     };
//
//     if (!profile) {
//         return <Text>Loading...</Text>;
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Profile</Text>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Username"
//                     value={profile.username}
//                     onChangeText={(text) => setProfile({...profile, username: text})}
//                     placeholderTextColor="gray"
//                     editable={false}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     value={profile.email}
//                     onChangeText={(text) => setProfile({...profile, email: text})}
//                     placeholderTextColor="gray"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="First Name"
//                     value={profile.first_name}
//                     onChangeText={(text) => setProfile({...profile, first_name: text})}
//                     placeholderTextColor="gray"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Last Name"
//                     value={profile.last_name}
//                     onChangeText={(text) => setProfile({...profile, last_name: text})}
//                     placeholderTextColor="gray"
//                 />
//                 <View style={localStyles.passwordContainer}>
//                     <TextInput
//                         style={[styles.input, localStyles.passwordInput]}
//                         placeholder="Old Password"
//                         value={oldPassword}
//                         onChangeText={setOldPassword}
//                         secureTextEntry={!showOldPassword}
//                         placeholderTextColor="gray"
//                     />
//                     <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={localStyles.iconContainer}>
//                         <Icon name={showOldPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={localStyles.passwordContainer}>
//                     <TextInput
//                         style={[styles.input, localStyles.passwordInput]}
//                         placeholder="New Password"
//                         value={newPassword}
//                         onChangeText={setNewPassword}
//                         secureTextEntry={!showNewPassword}
//                         placeholderTextColor="gray"
//                     />
//                     <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={localStyles.iconContainer}>
//                         <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
//                     </TouchableOpacity>
//                 </View>
//                 <CustomButton title="Update Profile" onPress={handleUpdateProfile} />
//                 <CustomButton title="Logout" onPress={handleLogout} />
//             </View>
//         </View>
//     );
// }
//
// const localStyles = StyleSheet.create({
//     passwordContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     passwordInput: {
//         flex: 1,
//         borderRadius: 5,
//     },
//     iconContainer: {
//         position: 'absolute',
//         right: 10,
//     },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, changePassword, logout as apiLogout } from '../api';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles";
import { useAuth } from "../context/AuthContext";
import * as LocalAuthentication from 'expo-local-authentication';

export default function ProfileScreen() {
    const { logout, enrollFingerprint } = useAuth();
    const [profile, setProfile] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isFingerprintEnrolled, setIsFingerprintEnrolled] = useState(false);

    useEffect(() => {
        fetchProfile();
        checkFingerprintEnrollment();
    }, []);

    const fetchProfile = async () => {
        try {
            const userString = await AsyncStorage.getItem('user');
            if (userString) {
                const userData = JSON.parse(userString);
                setProfile(userData);
            }
        } catch (error) {
            console.error('Failed to fetch profile', error);
            Alert.alert('Error', 'Failed to fetch profile. Please try again.');
        }
    };

    const checkFingerprintEnrollment = async () => {
        const enrolled = await AsyncStorage.getItem('fingerprintEnrolled');
        setIsFingerprintEnrolled(enrolled === 'true');
    };

    const handleUpdateProfile = async () => {
        try {
            const updatedProfile = {
                username: profile.username,
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
            };
            await updateUser(profile.id, updatedProfile);

            if (oldPassword && newPassword) {
                await changePassword(newPassword);
                setOldPassword('');
                setNewPassword('');
            }

            // Update local storage
            const updatedUserData = { ...profile, ...updatedProfile };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));

            Alert.alert('Success', 'Profile updated successfully.');
            fetchProfile(); // Refresh profile data
        } catch (error) {
            console.error('Failed to update profile', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    const handleLogout = async () => {
        try {
            await apiLogout();
            await logout();
            // Navigation to login screen should be handled in the AuthContext
        } catch (error) {
            console.error('Failed to logout', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    // const handleEnrollFingerprint = async () => {
    //     try {
    //         const available = await LocalAuthentication.hasHardwareAsync();
    //         if (!available) {
    //             Alert.alert('Error', 'Fingerprint authentication is not available on this device.');
    //             return;
    //         }
    //
    //         const enrolled = await LocalAuthentication.isEnrolledAsync();
    //         if (!enrolled) {
    //             Alert.alert('Error', 'No fingerprints are enrolled on this device.');
    //             return;
    //         }
    //
    //         const result = await LocalAuthentication.authenticateAsync({
    //             promptMessage: 'Authenticate to enroll fingerprint for login',
    //             disableDeviceFallback: true,
    //         });
    //
    //         if (result.success) {
    //             await enrollFingerprint();
    //             setIsFingerprintEnrolled(true);
    //             Alert.alert('Success', 'Fingerprint enrolled for login.');
    //         } else {
    //             Alert.alert('Error', 'Fingerprint enrollment failed. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Failed to enroll fingerprint', error);
    //         Alert.alert('Error', 'Failed to enroll fingerprint. Please try again.');
    //     }
    // };
    const handleEnrollFingerprint = async () => {
        try {
            console.log('Starting fingerprint enrollment process');

            const available = await LocalAuthentication.hasHardwareAsync();
            if (!available) {
                console.log('Fingerprint hardware not available');
                Alert.alert('Error', 'Fingerprint authentication is not available on this device.');
                return;
            }

            console.log('Fingerprint hardware is available');

            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (!enrolled) {
                console.log('No fingerprints are enrolled on this device');
                Alert.alert('Error', 'No fingerprints are enrolled on this device.');
                return;
            }

            console.log('Fingerprints are enrolled, proceeding with authentication');

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to enroll fingerprint for login',
                disableDeviceFallback: true,
            });

            console.log('Authentication result:', result);

            if (result.success) {
                await enrollFingerprint();
                setIsFingerprintEnrolled(true);
                console.log('Fingerprint enrolled successfully');
                Alert.alert('Success', 'Fingerprint enrolled for login.');
            } else {
                console.log('Fingerprint authentication failed');
                Alert.alert('Error', 'Fingerprint enrollment failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to enroll fingerprint', error);
            Alert.alert('Error', `Failed to enroll fingerprint: ${error.message}`);
        }
    };

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={profile.username}
                    onChangeText={(text) => setProfile({...profile, username: text})}
                    placeholderTextColor="gray"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={profile.email}
                    onChangeText={(text) => setProfile({...profile, email: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={profile.first_name}
                    onChangeText={(text) => setProfile({...profile, first_name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={profile.last_name}
                    onChangeText={(text) => setProfile({...profile, last_name: text})}
                    placeholderTextColor="gray"
                />
                <View style={localStyles.passwordContainer}>
                    <TextInput
                        style={[styles.input, localStyles.passwordInput]}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        secureTextEntry={!showOldPassword}
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={localStyles.iconContainer}>
                        <Icon name={showOldPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={localStyles.passwordContainer}>
                    <TextInput
                        style={[styles.input, localStyles.passwordInput]}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!showNewPassword}
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={localStyles.iconContainer}>
                        <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <CustomButton title="Update Profile" onPress={handleUpdateProfile} />

                {!isFingerprintEnrolled && (
                    <CustomButton
                        title="Enroll Fingerprint for Login"
                        onPress={handleEnrollFingerprint}
                        style={localStyles.fingerprintButton}
                    />
                )}

                <CustomButton title="Logout" onPress={handleLogout} />
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    passwordInput: {
        flex: 1,
        borderRadius: 5,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
    },
    fingerprintButton: {
        backgroundColor: '#4CAF50',
        marginTop: 10,
    },
});