import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Modal, Alert, Dimensions } from 'react-native';
import { getStudents, createStudent, updateStudent, deleteStudent, getPrograms } from '../api';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';
import styles from "../styles";

export default function ManageStudentsScreen() {
    const [students, setStudents] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [newStudent, setNewStudent] = useState({ first_name: '', last_name: '', student_id: '', program: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchPrograms();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch students', error);
            Alert.alert('Error', 'Failed to fetch students. Please try again.');
        }
    };

    const fetchPrograms = async () => {
        try {
            const response = await getPrograms();
            setPrograms(response.data);
        } catch (error) {
            console.error('Failed to fetch programs', error);
            Alert.alert('Error', 'Failed to fetch programs. Please try again.');
        }
    };

    const handleCreateStudent = async () => {
        try {
            await createStudent(newStudent);
            setNewStudent({ first_name: '', last_name: '', student_id: '', program: '' });
            fetchStudents();
            Alert.alert('Success', 'Student created successfully.');
        } catch (error) {
            console.error('Failed to create student', error);
            Alert.alert('Error', 'Failed to create student. Please try again.');
        }
    };

    const handleUpdateStudent = async () => {
        try {
            await updateStudent(editingStudent.id, editingStudent);
            setModalVisible(false);
            fetchStudents();
            Alert.alert('Success', 'Student updated successfully.');
        } catch (error) {
            console.error('Failed to update student', error);
            Alert.alert('Error', 'Failed to update student. Please try again.');
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            fetchStudents();
            Alert.alert('Success', 'Student deleted successfully.');
        } catch (error) {
            console.error('Failed to delete student', error);
            Alert.alert('Error', 'Failed to delete student. Please try again.');
        }
    };

    const openEditModal = (student) => {
        setEditingStudent(student);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Students</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={newStudent.first_name}
                    onChangeText={(text) => setNewStudent({...newStudent, first_name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={newStudent.last_name}
                    onChangeText={(text) => setNewStudent({...newStudent, last_name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student ID"
                    value={newStudent.student_id}
                    onChangeText={(text) => setNewStudent({...newStudent, student_id: text})}
                    placeholderTextColor="gray"
                />
                <Picker
                    selectedValue={newStudent.program}
                    style={styles.input}
                    onValueChange={(itemValue) => setNewStudent({...newStudent, program: itemValue})}
                >
                    <Picker.Item label="Select Program" value="" />
                    {programs.map((program) => (
                        <Picker.Item key={program.id} label={program.name} value={program.id} />
                    ))}
                </Picker>
                <CustomButton title="Add Student" onPress={handleCreateStudent} />
            </View>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{`${item.user.first_name} ${item.user.last_name}`}</Text>
                        <Text style={styles.itemDetails}>{`Student ID: ${item.student_id}`}</Text>
                        <Text style={styles.itemDetails}>{`Program: ${programs.find(p => p.id === item.program)?.name}`}</Text>
                        <CustomButton title="Edit" onPress={() => openEditModal(item)} />
                        <CustomButton title="Delete" onPress={() => handleDeleteStudent(item.id)} />
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Student</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="First Name"
                            value={editingStudent ? editingStudent.user.first_name : ''}
                            onChangeText={(text) => setEditingStudent({
                                ...editingStudent,
                                user: {...editingStudent.user, first_name: text}
                            })}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Last Name"
                            value={editingStudent ? editingStudent.user.last_name : ''}
                            onChangeText={(text) => setEditingStudent({
                                ...editingStudent,
                                user: {...editingStudent.user, last_name: text}
                            })}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Student ID"
                            value={editingStudent ? editingStudent.student_id : ''}
                            onChangeText={(text) => setEditingStudent({...editingStudent, student_id: text})}
                            placeholderTextColor="gray"
                        />
                        <Picker
                            selectedValue={editingStudent ? editingStudent.program : ''}
                            style={styles.modalPicker}
                            onValueChange={(itemValue) => setEditingStudent({...editingStudent, program: itemValue})}
                        >
                            <Picker.Item label="Select Program" value="" />
                            {programs.map((program) => (
                                <Picker.Item key={program.id} label={program.name} value={program.id} />
                            ))}
                        </Picker>
                        <CustomButton title="Update" onPress={handleUpdateStudent} />
                        <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const { width } = Dimensions.get('window');

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    modalInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    modalPicker: {
        width: '100%',
        marginBottom: 20,
    },
});

Object.assign(styles, modalStyles);