// screens/TakeAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getModules, getStudents, saveAttendance } from '../api';
import CustomButton from '../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import styles from "../styles";

export default function TakeAttendanceScreen() {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        if (selectedModule) {
            fetchStudents(selectedModule);
        }
    }, [selectedModule]);

    const fetchModules = async () => {
        try {
            const response = await getModules();
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch modules. Please try again.'
            });
        }
    };

    const fetchStudents = async (moduleId) => {
        try {
            const response = await getStudents(moduleId);
            setStudents(response.data);
            initializeAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch students', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch students. Please try again.'
            });
        }
    };

    const initializeAttendance = (studentList) => {
        const initialAttendance = {};
        studentList.forEach(student => {
            initialAttendance[student.id] = { present: false, absent: false };
        });
        setAttendance(initialAttendance);
    };

    const handleAttendanceChange = (studentId, status, value) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [status]: value,
                [status === 'present' ? 'absent' : 'present']: !value
            }
        }));
    };

    const handleSaveAttendance = async () => {
        try {
            await saveAttendance(selectedModule, attendance);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Attendance saved successfully.'
            });
        } catch (error) {
            console.error('Failed to save attendance', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to save attendance. Please try again.'
            });
        }
    };

    const renderStudentItem = ({ item }) => (
        <View style={localStyles.studentItem}>
            <Text style={localStyles.studentName}>{item.name}</Text>
            <View style={localStyles.checkboxContainer}>
                <CheckBox
                    value={attendance[item.id]?.present}
                    onValueChange={(newValue) => handleAttendanceChange(item.id, 'present', newValue)}
                />
                <Text>Present</Text>
            </View>
            <View style={localStyles.checkboxContainer}>
                <CheckBox
                    value={attendance[item.id]?.absent}
                    onValueChange={(newValue) => handleAttendanceChange(item.id, 'absent', newValue)}
                />
                <Text>Absent</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, localStyles.centeredContainer]}>
            <Text style={styles.title}>Take Attendance</Text>
            <Picker
                selectedValue={selectedModule}
                style={localStyles.picker}
                onValueChange={(itemValue) => setSelectedModule(itemValue)}
            >
                <Picker.Item label="Select Module" value="" />
                {modules.map((module) => (
                    <Picker.Item key={module.id} label={module.name} value={module.id} />
                ))}
            </Picker>
            {selectedModule && (
                <>
                    <FlatList
                        data={students}
                        renderItem={renderStudentItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <CustomButton title="Save Attendance" onPress={handleSaveAttendance} />
                </>
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 300,
        height: 50,
        marginBottom: 20,
    },
    studentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    studentName: {
        flex: 2,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});