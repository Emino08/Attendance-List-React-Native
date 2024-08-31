// screens/LecturerTakeAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import CheckBox from "@react-native-community/checkbox"
import { Picker } from '@react-native-picker/picker';
import { getLecturerModules, takeAttendance } from '../api';
import CustomButton from '../components/CustomButton';
import styles from "../styles";

export default function LecturerTakeAttendanceScreen() {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await getLecturerModules(1); // Assuming lecturer ID 1
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules', error);
        }
    };

    const handleModuleChange = (moduleId) => {
        setSelectedModule(moduleId);
        // Fetch students for this module (dummy data for now)
        setStudents([
            { id: 1, name: 'Alice Johnson', present: false, absent: false },
            { id: 2, name: 'Bob Smith', present: false, absent: false },
            // Add more students as needed
        ]);
    };

    const handleAttendanceChange = (studentId, status) => {
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, present: status === 'present', absent: status === 'absent' }
                : student
        ));
    };

    const handleSaveAttendance = async () => {
        try {
            const attendanceData = students.map(student => ({
                studentId: student.id,
                status: student.present ? 'present' : (student.absent ? 'absent' : null)
            }));
            await takeAttendance(selectedModule, attendanceData);
            Alert.alert('Success', 'Attendance saved successfully');
        } catch (error) {
            console.error('Failed to save attendance', error);
            Alert.alert('Error', 'Failed to save attendance. Please try again.');
        }
    };

    const renderStudentItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    style={styles.checkbox}
                    value={item.present}
                    onValueChange={(newValue) => handleAttendanceChange(item.id, newValue ? 'present' : null)}
                />
                <Text style={styles.text}>Present</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    style={styles.checkbox}
                    value={item.absent}
                    onValueChange={(newValue) => handleAttendanceChange(item.id, newValue ? 'absent' : null)}
                />
                <Text style={styles.text}>Absent</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Take Attendance</Text>
            <Picker
                style={styles.pickerItemText}
                selectedValue={selectedModule}
                onValueChange={handleModuleChange}
            >
                <Picker.Item label="Select a module" value={null} />
                {modules.map(module => (
                    <Picker.Item key={module.id} label={module.name} value={module.id} />
                ))}
            </Picker>
            {selectedModule && (
                <>
                    <FlatList
                        data={students}
                        renderItem={renderStudentItem}
                        keyExtractor={item => item.id.toString()}
                    />
                    <CustomButton title="Save Attendance" onPress={handleSaveAttendance} />
                </>
            )}
        </View>
    );
}
