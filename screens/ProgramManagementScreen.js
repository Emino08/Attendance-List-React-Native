// // screens/ProgramManagementScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
// import { getPrograms, createProgram, updateProgram, deleteProgram } from '../api';
// import CustomButton from '../components/CustomButton';
// import styles from "../styles";
//
// export default function ProgramManagementScreen() {
//     const [programs, setPrograms] = useState([]);
//     const [newProgramName, setNewProgramName] = useState('');
//     const [newProgramDescription, setNewProgramDescription] = useState('');
//
//     useEffect(() => {
//         fetchPrograms();
//     }, []);
//
//     const fetchPrograms = async () => {
//         try {
//             const response = await getPrograms();
//             setPrograms(response.data);
//         } catch (error) {
//             console.error('Failed to fetch programs', error);
//             Alert.alert('Error', 'Failed to fetch programs. Please try again.');
//         }
//     };
//
//     const handleCreateProgram = async () => {
//         try {
//             await createProgram({ name: newProgramName, description: newProgramDescription });
//             setNewProgramName('');
//             setNewProgramDescription('');
//             fetchPrograms();
//         } catch (error) {
//             console.error('Failed to create program', error);
//             Alert.alert('Error', 'Failed to create program. Please try again.');
//         }
//     };
//
//     const handleUpdateProgram = async (id, updatedProgram) => {
//         try {
//             await updateProgram(id, updatedProgram);
//             fetchPrograms();
//         } catch (error) {
//             console.error('Failed to update program', error);
//             Alert.alert('Error', 'Failed to update program. Please try again.');
//         }
//     };
//
//     const handleDeleteProgram = async (id) => {
//         try {
//             await deleteProgram(id);
//             fetchPrograms();
//         } catch (error) {
//             console.error('Failed to delete program', error);
//             Alert.alert('Error', 'Failed to delete program. Please try again.');
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Program Management</Text>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Program Name"
//                     value={newProgramName}
//                     onChangeText={setNewProgramName}
//                     placeholderTextColor="gray"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Program Description"
//                     value={newProgramDescription}
//                     onChangeText={setNewProgramDescription}
//                     multiline
//                     placeholderTextColor="gray"
//                 />
//                 <CustomButton title="Add Program" onPress={handleCreateProgram} />
//             </View>
//             <FlatList
//                 data={programs}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.itemContainer}>
//                         <Text style={styles.itemName}>{item.name}</Text>
//                         <Text style={styles.itemDescription}>{item.description}</Text>
//                         <CustomButton title="Edit" onPress={() => {/* Implement edit functionality */}} />
//                         <CustomButton title="Delete" onPress={() => handleDeleteProgram(item.id)} />
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }
// screens/ProgramManagementScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert, Modal } from 'react-native';
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../api';
import CustomButton from '../components/CustomButton';
import styles from "../styles";

export default function ProgramManagementScreen() {
    const [programs, setPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState('');
    const [newProgramDescription, setNewProgramDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await getPrograms();
            setPrograms(response.data);
        } catch (error) {
            console.error('Failed to fetch programs', error);
            Alert.alert('Error', 'Failed to fetch programs. Please try again.');
        }
    };

    const handleCreateProgram = async () => {
        try {
            await createProgram({ name: newProgramName, description: newProgramDescription });
            setNewProgramName('');
            setNewProgramDescription('');
            fetchPrograms();
        } catch (error) {
            console.error('Failed to create program', error);
            Alert.alert('Error', 'Failed to create program. Please try again.');
        }
    };

    const handleUpdateProgram = async () => {
        try {
            await updateProgram(editingProgram.id, editingProgram);
            setModalVisible(false);
            fetchPrograms();
        } catch (error) {
            console.error('Failed to update program', error);
            Alert.alert('Error', 'Failed to update program. Please try again.');
        }
    };

    const handleDeleteProgram = async (id) => {
        try {
            await deleteProgram(id);
            fetchPrograms();
        } catch (error) {
            console.error('Failed to delete program', error);
            Alert.alert('Error', 'Failed to delete program. Please try again.');
        }
    };

    const openEditModal = (program) => {
        setEditingProgram(program);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Program Management</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Program Name"
                    value={newProgramName}
                    onChangeText={setNewProgramName}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Program Description"
                    value={newProgramDescription}
                    onChangeText={setNewProgramDescription}
                    multiline
                    placeholderTextColor="gray"
                />
                <CustomButton title="Add Program" onPress={handleCreateProgram} />
            </View>
            <FlatList
                data={programs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <CustomButton title="Edit" onPress={() => openEditModal(item)} />
                        <CustomButton title="Delete" onPress={() => handleDeleteProgram(item.id)} />
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
                        <Text style={styles.modalText}>Edit Program</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Program Name"
                            value={editingProgram ? editingProgram.name : ''}
                            onChangeText={(text) => setEditingProgram({...editingProgram, name: text})}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Program Description"
                            value={editingProgram ? editingProgram.description : ''}
                            onChangeText={(text) => setEditingProgram({...editingProgram, description: text})}
                            multiline
                            placeholderTextColor="gray"
                        />
                        <CustomButton title="Update" onPress={handleUpdateProgram} />
                        <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
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