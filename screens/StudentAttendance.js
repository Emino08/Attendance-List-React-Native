// screens/StudentAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getStudentAttendance } from '../api';
import styles from "../styles";

export default function StudentAttendanceScreen({ navigation }) {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await getStudentAttendance(1); // Assuming student ID 1
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer} onPress={() => navigation.navigate('StudentAttendanceDetailsScreen', { moduleId: item.id })}
        >
            <Text style={styles.itemName}>{item.module}</Text>
            <View style={styles.attendanceInfo}>
                <Text style={styles.attendanceText}>Present: {item.present}</Text>
                <Text style={styles.attendanceText}>Absent: {item.absent}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Attendance</Text>
            <FlatList
                data={attendance}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.totalAttendance}>
                <Text style={styles.totalText}>Total Present: {attendance.reduce((sum, item) => sum + item.present, 0)}</Text>
                <Text style={styles.totalText}>Total Absent: {attendance.reduce((sum, item) => sum + item.absent, 0)}</Text>
            </View>
        </View>
    );
}
