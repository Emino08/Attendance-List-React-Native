// screens/LecturerModuleAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getLecturerAttendance } from '../api';
import styles from "../styles";

export default function LecturerModuleAttendanceScreen({ route, navigation }) {
    const [attendance, setAttendance] = useState([]);
    const { moduleId } = route.params;

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await getLecturerAttendance(1, moduleId); // Assuming lecturer ID 1
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('LecturerStudentAttendanceDetailsScreen', { moduleId, studentId: item.id })}
        >
            <Text style={styles.itemName}>{item.student}</Text>
            <View style={styles.attendanceInfo}>
                <Text style={styles.attendanceText}>Present: {item.present}</Text>
                <Text style={styles.attendanceText}>Absent: {item.absent}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Module Attendance</Text>
            <FlatList
                data={attendance}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}