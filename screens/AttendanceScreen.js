// screens/AttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
// import { useSelector } from 'react-redux';
import { getStudents, getLecturers, markStudentAttendance, markLecturerAttendance } from '../api';
import CustomButton from '../components/CustomButton';
import styles from "../styles";

export default function AttendanceScreen() {
    const [attendees, setAttendees] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    // const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            const response = user?.role === 'lecturer' ? await getStudents() : await getLecturers();
            setAttendees(response.data);
        } catch (error) {
            console.error('Failed to fetch attendees', error);
            Alert.alert('Error', 'Failed to fetch attendees. Please try again.');
        }
    };

    const markAttendance = async (attendeeId, status) => {
        if (!selectedModule) {
            Alert.alert('Error', 'Please select a module first');
            return;
        }

        const attendanceData = {
            [user?.role === 'lecturer' ? 'student' : 'lecturer']: attendeeId,
            module: selectedModule.id,
            date: new Date().toISOString().split('T')[0],
            status,
        };

        try {
            const markAttendanceFunc = user.role === 'lecturer' ? markStudentAttendance : markLecturerAttendance;
            await markAttendanceFunc(attendanceData);
            Alert.alert('Success', 'Attendance marked successfully');
        } catch (error) {
            console.error('Failed to mark attendance', error);
            Alert.alert('Error', 'Failed to mark attendance. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mark Attendance</Text>
            {/* Add a module selector here */}
            <FlatList
                data={attendees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.attendeeItem}>
                        <Text style={styles.itemName}>{item?.user?.first_name} {item?.user?.last_name}</Text>
                        <CustomButton title="Present" onPress={() => markAttendance(item.id, 'present')} />
                        <CustomButton title="Absent" onPress={() => markAttendance(item.id, 'absent')} />
                        <CustomButton title="Late" onPress={() => markAttendance(item.id, 'late')} />
                    </View>
                )}
            />
        </View>
    );
}