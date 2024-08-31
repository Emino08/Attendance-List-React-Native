// screens/ChangePasswordScreen.js

import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import styles from '../styles';

export default function ChangePasswordScreen({ navigation }) {
    const { logout } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { changePassword } = useAuth();

    // logout();
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const success = await changePassword(newPassword);
        if (success) {
            Alert.alert('Success', 'Password changed successfully');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Failed to change password');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <CustomButton title="Change Password" onPress={handleChangePassword} />
        </View>
    );
}