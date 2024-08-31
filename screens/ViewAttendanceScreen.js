// screens/AdminViewAttendanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getPrograms, getModulesByProgram, getLecturerAttendance } from '../api';
import styles from "../styles";

export default function AdminViewAttendanceScreen({ navigation }) {
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
            <Picker
                selectedValue={selectedProgram}
                onValueChange={handleProgramChange}
            >
                <Picker.Item label="Select a program" value={null} />
                {programs.map(program => (
                    <Picker.Item key={program.id} label={program.name} value={program.id} />
                ))}
            </Picker>
            {selectedProgram && (
                <Picker
                    selectedValue={selectedModule}
                    onValueChange={handleModuleChange}
                >
                    <Picker.Item label="Select a module" value={null} />
                    {modules.map(module => (
                        <Picker.Item key={module.id} label={module.name} value={module.id} />
                    ))}
                </Picker>
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

// // screens/ViewAttendanceScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { getPrograms, getModules, getAttendance } from '../api';
// import CustomButton from '../components/CustomButton';
// import Toast from 'react-native-toast-message';
// import styles from "../styles";
//
// export default function ViewAttendanceScreen({ route }) {
//     const [programs, setPrograms] = useState([]);
//     const [modules, setModules] = useState([]);
//     const [selectedProgram, setSelectedProgram] = useState('');
//     const [selectedModule, setSelectedModule] = useState('');
//     const [attendance, setAttendance] = useState([]);
//     const { userType } = route.params; // 'admin', 'student', or 'lecturer'
//
//     useEffect(() => {
//         fetchPrograms();
//     }, []);
//
//     useEffect(() => {
//         if (selectedProgram) {
//             fetchModules(selectedProgram);
//         }
//     }, [selectedProgram]);
//
//     const fetchPrograms = async () => {
//         try {
//             const response = await getPrograms();
//             setPrograms(response.data);
//         } catch (error) {
//             console.error('Failed to fetch programs', error);
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: 'Failed to fetch programs. Please try again.'
//             });
//         }
//     };
//
//     const fetchModules = async (programId) => {
//         try {
//             const response = await getModules(programId);
//             setModules(response.data);
//         } catch (error) {
//             console.error('Failed to fetch modules', error);
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: 'Failed to fetch modules. Please try again.'
//             });
//         }
//     };
//
//     const fetchAttendance = async () => {
//         try {
//             const response = await getAttendance(selectedModule);
//             setAttendance(response.data);
//         } catch (error) {
//             console.error('Failed to fetch attendance', error);
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: 'Failed to fetch attendance. Please try again.'
//             });
//         }
//     };
//
//     const renderAttendanceItem = ({ item }) => (
//         <View style={localStyles.attendanceItem}>
//             <Text style={localStyles.studentName}>{item.studentName}</Text>
//             <Text style={localStyles.attendanceCount}>Present: {item.presentCount}</Text>
//             <Text style={localStyles.attendanceCount}>Absent: {item.absentCount}</Text>
//             <CustomButton
//                 title="Details"
//                 onPress={() => Alert.alert('Attendance Details', `Detailed attendance for ${item.studentName}`)}
//             />
//         </View>
//     );
//
//     return (
//         <View style={[styles.container, localStyles.centeredContainer]}>
//             <Text style={styles.title}>View Attendance</Text>
//             {userType === 'admin' && (
//                 <>
//                     <Picker
//                         selectedValue={selectedProgram}
//                         style={localStyles.picker}
//                         onValueChange={(itemValue) => setSelectedProgram(itemValue)}
//                     >
//                         <Picker.Item label="Select Program" value="" />
//                         {programs.map((program) => (
//                             <Picker.Item key={program.id} label={program.name} value={program.id} />
//                         ))}
//                     </Picker>
//                     <Picker
//                         selectedValue={selectedModule}
//                         style={localStyles.picker}
//                         onValueChange={(itemValue) => setSelectedModule(itemValue)}
//                     >
//                         <Picker.Item label="Select Module" value="" />
//                         {modules.map((module) => (
//                             <Picker.Item key={module.id} label={module.name} value={module.id} />
//                         ))}
//                     </Picker>
//                     <CustomButton title="View Attendance" onPress={fetchAttendance} />
//                 </>
//             )}
//             {attendance.length > 0 && (
//                 <>
//                     <Text style={localStyles.moduleTitle}>{selectedModule}</Text>
//                     <View style={localStyles.headerRow}>
//                         <Text style={localStyles.headerText}>Present</Text>
//                     <Text style={localStyles.headerText}>Absent</Text>
//                 </View>
//                 <FlatList
//                 data={attendance}
//             renderItem={renderAttendanceItem}
//             keyExtractor={(item) => item.id.toString()}
//         />
// </>
// )}
// </View>
// );
// }
//
// const localStyles = StyleSheet.create({
//     centeredContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     picker: {
//         width: 300,
//         height: 50,
//         marginBottom: 20,
//     },
//     moduleTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginVertical: 10,
//     },
//     headerRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         paddingHorizontal: 20,
//         marginBottom: 10,
//     },
//     headerText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     attendanceItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     studentName: {
//         flex: 2,
//         fontSize: 16,
//     },
//     attendanceCount: {
//         flex: 1,
//         fontSize: 14,
//     },
// });