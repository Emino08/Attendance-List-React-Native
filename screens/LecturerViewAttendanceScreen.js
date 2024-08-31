import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getPrograms, getModulesByProgram, getLecturerAttendance } from '../api';
import styles from "../styles";

export default function LecturerViewAttendanceScreen({ navigation }) {
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await getPrograms();
            setPrograms(response.data);
        } catch (error) {
            console.error('Failed to fetch programs', error);
        }
    };

    const handleProgramChange = async (programId) => {
        setSelectedProgram(programId);
        try {
            const response = await getModulesByProgram(programId);
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules', error);
        }
    };

    const handleModuleChange = async (moduleId) => {
        setSelectedModule(moduleId);
        try {
            const response = await getLecturerAttendance(1, moduleId); // Assuming lecturer ID 1
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        }
    };

    const renderAttendanceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('LecturerStudentAttendanceDetailsScreen', { moduleId: selectedModule, studentId: item.id })}
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
            <Text style={styles.title}>View Attendance</Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedProgram}
                    onValueChange={handleProgramChange}
                    style={styles.pickerItemText}
                    itemStyle={{ color: 'black' }}
                >
                    <Picker.Item label="Select a program" value={null} />
                    {programs.map(program => (
                        <Picker.Item key={program.id} label={program.name} value={program.id} />
                    ))}
                </Picker>
            </View>
            {selectedProgram && (
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedModule}
                        onValueChange={handleModuleChange}
                        style={styles.pickerItemText}
                        itemStyle={{ color: 'black' }}
                    >
                        <Picker.Item label="Select a module" value={null} />
                        {modules.map(module => (
                            <Picker.Item key={module.id} label={module.name} value={module.id} />
                        ))}
                    </Picker>
                </View>
            )}
            {selectedModule && (
                <FlatList
                    data={attendance}
                    renderItem={renderAttendanceItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
}
