import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, Modal, Dimensions } from 'react-native';
import { getLecturers, createLecturer, updateLecturer, deleteLecturer, getModules } from '../api';
import CustomButton from '../components/CustomButton';
import MultiSelect from 'react-native-multiple-select';
import styles from "../styles";

export default function LecturerManagementScreen() {
    const [lecturers, setLecturers] = useState([]);
    const [modules, setModules] = useState([]);
    const [newLecturer, setNewLecturer] = useState({ first_name: '', last_name: '', staff_id: '', modules: [] });
    const [modalVisible, setModalVisible] = useState(false);
    const [editingLecturer, setEditingLecturer] = useState(null);

    useEffect(() => {
        fetchLecturers();
        fetchModules();
    }, []);

    const fetchLecturers = async () => {
        try {
            const response = await getLecturers();
            setLecturers(response.data);
        } catch (error) {
            console.error('Failed to fetch lecturers', error);
            Alert.alert('Error', 'Failed to fetch lecturers. Please try again.');
        }
    };

    const fetchModules = async () => {
        try {
            const response = await getModules();
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules', error);
            Alert.alert('Error', 'Failed to fetch modules. Please try again.');
        }
    };

    const handleCreateLecturer = async () => {
        try {
            await createLecturer(newLecturer);
            setNewLecturer({ first_name: '', last_name: '', staff_id: '', modules: [] });
            fetchLecturers();
            Alert.alert('Success', 'Lecturer created successfully.');
        } catch (error) {
            console.error('Failed to create lecturer', error);
            Alert.alert('Error', 'Failed to create lecturer. Please try again.');
        }
    };

    const handleUpdateLecturer = async () => {
        try {
            await updateLecturer(editingLecturer.id, editingLecturer);
            setModalVisible(false);
            fetchLecturers();
            Alert.alert('Success', 'Lecturer updated successfully.');
        } catch (error) {
            console.error('Failed to update lecturer', error);
            Alert.alert('Error', 'Failed to update lecturer. Please try again.');
        }
    };

    const handleDeleteLecturer = async (id) => {
        try {
            await deleteLecturer(id);
            fetchLecturers();
            Alert.alert('Success', 'Lecturer deleted successfully.');
        } catch (error) {
            console.error('Failed to delete lecturer', error);
            Alert.alert('Error', 'Failed to delete lecturer. Please try again.');
        }
    };

    const openEditModal = (lecturer) => {
        setEditingLecturer(lecturer);
        setModalVisible(true);
    };

    const onSelectedModulesChange = (selectedItems) => {
        setNewLecturer(prevState => ({
            ...prevState,
            modules: selectedItems
        }));
    };

    const onEditSelectedModulesChange = (selectedItems) => {
        setEditingLecturer(prevState => ({
            ...prevState,
            modules: selectedItems
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lecturer Management</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={newLecturer.first_name}
                    onChangeText={(text) => setNewLecturer({...newLecturer, first_name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={newLecturer.last_name}
                    onChangeText={(text) => setNewLecturer({...newLecturer, last_name: text})}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Staff ID"
                    value={newLecturer.staff_id}
                    onChangeText={(text) => setNewLecturer({...newLecturer, staff_id: text})}
                    placeholderTextColor="gray"
                />
                <Text style={styles.label}>Assign Modules:</Text>
                <MultiSelect
                    hideTags
                    items={modules}
                    uniqueKey="id"
                    onSelectedItemsChange={onSelectedModulesChange}
                    selectedItems={newLecturer.modules}
                    selectText="Select Modules"
                    searchInputPlaceholderText="Search Modules..."
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                />
                <CustomButton title="Add Lecturer" onPress={handleCreateLecturer} />
            </View>
            <FlatList
                data={lecturers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{`${item.user.first_name} ${item.user.last_name}`}</Text>
                        <Text style={styles.itemDetails}>{`Staff ID: ${item.staff_id}`}</Text>
                        <Text style={styles.itemDetails}>Modules: {item.modules.map(m => modules.find(mod => mod.id === m)?.name).join(', ')}</Text>
                        <CustomButton title="Edit" onPress={() => openEditModal(item)} />
                        <CustomButton title="Delete" onPress={() => handleDeleteLecturer(item.id)} />
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
                        <Text style={styles.modalText}>Edit Lecturer</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="First Name"
                            value={editingLecturer ? editingLecturer.user.first_name : ''}
                            onChangeText={(text) => setEditingLecturer({
                                ...editingLecturer,
                                user: {...editingLecturer.user, first_name: text}
                            })}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Last Name"
                            value={editingLecturer ? editingLecturer.user.last_name : ''}
                            onChangeText={(text) => setEditingLecturer({
                                ...editingLecturer,
                                user: {...editingLecturer.user, last_name: text}
                            })}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Staff ID"
                            value={editingLecturer ? editingLecturer.staff_id : ''}
                            onChangeText={(text) => setEditingLecturer({...editingLecturer, staff_id: text})}
                            placeholderTextColor="gray"
                        />
                        <Text style={styles.label}>Assign Modules:</Text>
                        <MultiSelect
                            hideTags
                            items={modules}
                            uniqueKey="id"
                            onSelectedItemsChange={onEditSelectedModulesChange}
                            selectedItems={editingLecturer ? editingLecturer.modules : []}
                            selectText="Select Modules"
                            searchInputPlaceholderText="Search Modules..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        <CustomButton title="Update" onPress={handleUpdateLecturer} />
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
});

Object.assign(styles, modalStyles);