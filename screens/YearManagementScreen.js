import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getYears, createYear, updateYear, deleteYear } from '../api';
import CustomButton from '../components/CustomButton';
import styles from "../styles";

export default function YearManagementScreen() {
    const [years, setYears] = useState([]);
    const [newYear, setNewYear] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingYear, setEditingYear] = useState(null);

    useEffect(() => {
        fetchYears();
    }, []);

    const fetchYears = async () => {
        try {
            const response = await getYears();
            setYears(response.data);
        } catch (error) {
            console.log('Login failed', error);
            console.log('Error message:', error.message);
            console.log('Error response:', error.response);
            Alert.alert('Error', 'Failed to fetch years. Please try again.');
        }
    };

    const handleCreateYear = async () => {
        try {
            await createYear({ year: parseInt(newYear), is_current: false });
            setNewYear('');
            fetchYears();
        } catch (error) {
            console.error('Failed to create year', error);
            Alert.alert('Error', 'Failed to create year. Please try again.');
        }
    };

    const handleUpdateYear = async () => {
        try {
            await updateYear(editingYear.id, editingYear);
            setModalVisible(false);
            fetchYears();
        } catch (error) {
            console.error('Failed to update year', error);
            Alert.alert('Error', 'Failed to update year. Please try again.');
        }
    };

    const handleDeleteYear = async (id) => {
        try {
            await deleteYear(id);
            fetchYears();
        } catch (error) {
            console.error('Failed to delete year', error);
            Alert.alert('Error', 'Failed to delete year. Please try again.');
        }
    };

    const openEditModal = (year) => {
        setEditingYear(year);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Year Management</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Year"
                    value={newYear}
                    onChangeText={setNewYear}
                    keyboardType="numeric"
                    placeholderTextColor="gray"
                />
                <CustomButton title="Add Year" onPress={handleCreateYear} />
            </View>
            <FlatList
                data={years}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.year}</Text>
                        <CustomButton title="Edit" onPress={() => openEditModal(item)} />
                        <CustomButton title="Delete" onPress={() => handleDeleteYear(item.id)} />
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
                        <Text style={styles.modalText}>Edit Year</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Year"
                            value={editingYear ? editingYear.year.toString() : ''}
                            onChangeText={(text) => setEditingYear({...editingYear, year: parseInt(text)})}
                            keyboardType="numeric"
                            placeholderTextColor="gray"
                        />
                        <View style={styles.checkboxContainer}>
                            <Text>Is Current: </Text>
                            <TouchableOpacity
                                style={[styles.checkbox, editingYear?.is_current && styles.checkboxChecked]}
                                onPress={() => setEditingYear({...editingYear, is_current: !editingYear.is_current})}
                            />
                        </View>
                        <CustomButton title="Update" onPress={handleUpdateYear} />
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
        width: width,
        backgroundColor: "white",
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 10,
    },
    checkboxChecked: {
        backgroundColor: '#000',
    },
});

Object.assign(styles, modalStyles);