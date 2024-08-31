// screens/StudentAttendanceDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getStudentAttendanceDetails } from '../api';
import styles from "../styles";

export default function StudentAttendanceDetailsScreen({ route }) {
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const { moduleId } = route.params;

    useEffect(() => {
        fetchAttendanceDetails();
    }, []);

    const fetchAttendanceDetails = async () => {
        try {
            const response = await getStudentAttendanceDetails(1, moduleId); // Assuming student ID 1
            setAttendanceDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance details', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.date}</Text>
            <Text style={styles.itemDetails}>{item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendance Details</Text>
            <FlatList
                data={attendanceDetails}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
