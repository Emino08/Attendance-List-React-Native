// screens/LecturerAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getLecturerModules } from '../api';
import styles from "../styles";

export default function LecturerAttendanceScreen({ navigation }) {
    const [modules, setModules] = useState([]);

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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('LecturerModuleAttendanceScreen', { moduleId: item.id })}
        >
            <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Modules</Text>
            <FlatList
                data={modules}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}