// screens/StudentDashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import styles from "../styles";
import { useAuth} from "../context/AuthContext";

export default function StudentDashboardScreen({ navigation }) {
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout(); // Perform logout
        navigation.navigate('LoginScreen'); // Navigate to login screen
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Dashboard</Text>
            <CustomButton
                title="View Attendance"
                onPress={() => navigation.navigate('StudentAttendance', { userType: 'student' })}
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