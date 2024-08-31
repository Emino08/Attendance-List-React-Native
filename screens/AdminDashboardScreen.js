// screens/AdminDashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import styles from "../styles";
import {useAuth} from "../context/AuthContext";

export default function AdminDashboardScreen({ navigation }) {
    const { logout } = useAuth(); // Get the logout function from your context

    const handleLogout = async () => {
        await logout(); // Perform logout
        navigation.navigate('LoginScreen'); // Navigate to login screen
    };
    return (
        // <View style={[styles.container, localStyles.centeredContainer]}>
        <View style={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <CustomButton title="Manage Years" onPress={() => navigation.navigate('YearManagement')} />
            <CustomButton title="Manage Programs" onPress={() => navigation.navigate('ProgramManagement')} />
            <CustomButton title="Manage Modules" onPress={() => navigation.navigate('ModuleManagement')} />
            <CustomButton
                title="Manage Lecturers"
                onPress={() => navigation.navigate('ManageLecturers')}
            />
            <CustomButton
                title="Manage Students"
                onPress={() => navigation.navigate('ManageStudents')}
            />
            <CustomButton
                title="View Attendance"
                onPress={() => navigation.navigate('ViewAttendance', { userType: 'admin' })}
            />
            <CustomButton
                title="Profile"
                onPress={() => navigation.navigate('ProfileScreen')}
            />
            <CustomButton
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
}

const localStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});