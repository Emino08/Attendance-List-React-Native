import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import styles from '../styles';
import CustomButton from '../components/CustomButton';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);
    const { login, fingerprintLogin } = useAuth();

    useEffect(() => {
        checkFingerprintAvailability();
    }, []);

    const checkFingerprintAvailability = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setIsFingerprintAvailable(hasHardware && isEnrolled);
    };

    const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success) {
            if (result.requiresPasswordChange) {
                navigation.replace('ChangePassword');
            } else {
                navigation.replace('Dashboard');
            }
        } else {
            Alert.alert('Login Failed', 'Please check your credentials and try again.');
        }
    };

    const handleFingerprintAuth = async () => {
        const result = await fingerprintLogin();
        if (result.success) {
            // navigation.replace('Dashboard');
            Alert.alert('Login Successful', 'You have successfully logged in using your fingerprint.');
        } else {
            Alert.alert('Login Failed', 'Fingerprint authentication failed. Please try again or use email/password.');
        }
    };

    return (
        <View style={[styles.container, localStyles.centeredContainer]}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="gray"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="gray"
            />
            <CustomButton title="Login" onPress={handleLogin} />
            {isFingerprintAvailable && (
                <CustomButton
                    title="Login with Fingerprint"
                    onPress={handleFingerprintAuth}
                    style={localStyles.fingerprintButton}
                />
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
    },
    fingerprintButton: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
    },
});
// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Alert } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import styles from '../styles';
// import CustomButton from '../components/CustomButton';
//
// export default function LoginScreen({ navigation }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login, user } = useAuth();
//
//     const handleLogin = async () => {
//         const success = await login(email, password);
//         // if (success) {
//         //     // console.log('Login successful, user role:', user.role);
//         //     // Redirect to the appropriate screen based on the user role
//         //     if (user.role === 'admin') {
//         //         navigation.replace('AdminDashboard'); // Replace with admin-specific screen
//         //     } else if (user.role === 'lecturer') {
//         //         navigation.replace('LecturerDashboard'); // Replace with lecturer-specific screen
//         //     } else if (user.role === 'student') {
//         //         navigation.replace('StudentDashboard'); // Replace with student-specific screen
//         //     } else {
//         //         Alert.alert('Login Failed', 'User role not recognized.');
//         //     }
//         // } else {
//         //     Alert.alert('Login Failed', 'Please check your credentials and try again.');
//         // }
//     };
//
//     return (
//         <View style={[styles.container, localStyles.centeredContainer]}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholderTextColor="gray"
//                 keyboardType="email-address"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 placeholderTextColor="gray"
//             />
//             <CustomButton title="Login" onPress={handleLogin} />
//         </View>
//     );
// }
//
// const localStyles = StyleSheet.create({
//     centeredContainer: {
//         justifyContent: 'center',
//     },
// });

