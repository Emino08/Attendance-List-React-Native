import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getModules, createModule, updateModule, deleteModule, getPrograms, getYears } from '../api';
import CustomButton from '../components/CustomButton';
import styles from '../styles';
import { Picker } from '@react-native-picker/picker';

export default function ModuleManagementScreen() {
    const [modules, setModules] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [years, setYears] = useState([]);
    const [newModule, setNewModule] = useState({ name: '', description: '', program: '', year: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [editingModule, setEditingModule] = useState(null);

    useEffect(() => {
        fetchModules();
        fetchPrograms();
        fetchYears();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await getModules();
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules', error);
            Alert.alert('Error', 'Failed to fetch modules. Please try again.');
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

    const fetchYears = async () => {
        try {
            const response = await getYears();
            setYears(response.data);
        } catch (error) {
            console.error('Failed to fetch years', error);
            Alert.alert('Error', 'Failed to fetch years. Please try again.');
        }
    };

    const handleCreateModule = async () => {
        try {
            await createModule(newModule);
            setNewModule({ name: '', description: '', program: '', year: '' });
            fetchModules();
            Alert.alert('Success', 'Module created successfully.');
        } catch (error) {
            console.error('Failed to create module', error);
            Alert.alert('Error', 'Failed to create module. Please try again.');
        }
    };

    const handleUpdateModule = async () => {
        try {
            await updateModule(editingModule.id, editingModule);
            setModalVisible(false);
            fetchModules();
            Alert.alert('Success', 'Module updated successfully.');
        } catch (error) {
            console.error('Failed to update module', error);
            Alert.alert('Error', 'Failed to update module. Please try again.');
        }
    };

    const handleDeleteModule = async (id) => {
        try {
            await deleteModule(id);
            fetchModules();
            Alert.alert('Success', 'Module deleted successfully.');
        } catch (error) {
            console.error('Failed to delete module', error);
            Alert.alert('Error', 'Failed to delete module. Please try again.');
        }
    };

    const openEditModal = (module) => {
        setEditingModule(module);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Module Management</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Module Name"
                    value={newModule.name}
                    onChangeText={(text) => setNewModule({...newModule, name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Module Description"
                    value={newModule.description}
                    onChangeText={(text) => setNewModule({...newModule, description: text})}
                    multiline
                    placeholderTextColor="gray"
                />
                <Picker
                    selectedValue={newModule.program}
                    onValueChange={(itemValue) => setNewModule({...newModule, program: itemValue})}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Program" value="" />
                    {programs.map((program) => (
                        <Picker.Item key={program.id} label={program.name} value={program.id} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={newModule.year}
                    onValueChange={(itemValue) => setNewModule({...newModule, year: itemValue})}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Year" value="" />
                    {years.map((year) => (
                        <Picker.Item key={year.id} label={year.year.toString()} value={year.id} />
                    ))}
                </Picker>
                <CustomButton title="Add Module" onPress={handleCreateModule} />
            </View>
            <FlatList
                data={modules}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.moduleItem}>
                        <Text style={styles.moduleName}>{item.name}</Text>
                        <Text style={styles.moduleDescription}>{item.description}</Text>
                        <CustomButton title="Edit" onPress={() => openEditModal(item)} />
                        <CustomButton title="Delete" onPress={() => handleDeleteModule(item.id)} />
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
                        <Text style={styles.modalText}>Edit Module</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Module Name"
                            value={editingModule ? editingModule.name : ''}
                            onChangeText={(text) => setEditingModule({...editingModule, name: text})}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Module Description"
                            value={editingModule ? editingModule.description : ''}
                            onChangeText={(text) => setEditingModule({...editingModule, description: text})}
                            multiline
                            placeholderTextColor="gray"
                        />
                        <Picker
                            selectedValue={editingModule ? editingModule.program : ''}
                            onValueChange={(itemValue) => setEditingModule({...editingModule, program: itemValue})}
                            style={styles.modalPicker}
                        >
                            <Picker.Item label="Select Program" value="" />
                            {programs.map((program) => (
                                <Picker.Item key={program.id} label={program.name} value={program.id} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={editingModule ? editingModule.year : ''}
                            onValueChange={(itemValue) => setEditingModule({...editingModule, year: itemValue})}
                            style={styles.modalPicker}
                        >
                            <Picker.Item label="Select Year" value="" />
                            {years.map((year) => (
                                <Picker.Item key={year.id} label={year.year.toString()} value={year.id} />
                            ))}
                        </Picker>
                        <CustomButton title="Update" onPress={handleUpdateModule} />
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