// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import LecturerDashboardScreen from './screens/LecturerDashboardScreen';
import StudentDashboardScreen from './screens/StudentDashboardScreen';
import ManageLecturersScreen from './screens/ManageLecturersScreen';
import ManageStudentsScreen from './screens/ManageStudentsScreen';
import ViewAttendanceScreen from './screens/ViewAttendanceScreen';
import TakeAttendanceScreen from './screens/TakeAttendanceScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingScreen from './screens/LoadingScreen';
import ModuleManagementScreen from "./screens/ModuleManagementScreen";
import ProgramManagementScreen from "./screens/ProgramManagementScreen";
import YearManagementScreen from "./screens/YearManagementScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import LecturerAttendanceScreen from "./screens/LecturerAttendanceScreen";
import LecturerViewAttendanceScreen from "./screens/LecturerViewAttendanceScreen";
import LecturerStudentAttendanceDetailsScreen from "./screens/LecturerStudentAttendanceDetailsScreen";
import LecturerModuleAttendanceScreen from "./screens/LectuterModuleAttendanceScreen"; // Add this component
import LecturerTakeAttendanceScreen from "./screens/LecturerTakeAttendanceScreen";
import StudentAttendanceScreen from "./screens/StudentAttendance";
import StudentAttendanceDetailsScreen from "./screens/StudentAttendanceDetailsScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen"; // Add this component

const Stack = createStackNavigator();

function AppNavigator() {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingScreen />; // Display a loading screen or spinner
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    user.is_password_changed ? (
                        // true ? (
                        <>
                            {user.role === 'admin' && (
                                <>
                                    <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
                                    <Stack.Screen name="YearManagement" component={YearManagementScreen} />
                                    <Stack.Screen name="ProgramManagement" component={ProgramManagementScreen} />
                                    <Stack.Screen name="ModuleManagement" component={ModuleManagementScreen} />
                                    <Stack.Screen name="ManageLecturers" component={ManageLecturersScreen} />
                                    <Stack.Screen name="ManageStudents" component={ManageStudentsScreen} />
                                    <Stack.Screen name="ViewAttendance" component={ViewAttendanceScreen} />
                                    <Stack.Screen name="LecturerStudentAttendanceDetailsScreen" component={LecturerStudentAttendanceDetailsScreen} />
                                </>

                            )}
                            {user.role === 'lecturer' && (
                                <>
                                    <Stack.Screen name="LecturerDashboard" component={LecturerDashboardScreen} />
                                    {/*<Stack.Screen name="TakeAttendance" component={TakeAttendanceScreen} />*/}
                                    {/*<Stack.Screen name="ViewAttendance" component={ViewAttendanceScreen} />*/}
                                    <Stack.Screen name="LecturerTakeAttendanceScreen" component={LecturerTakeAttendanceScreen} />
                                    <Stack.Screen name="LecturerViewAttendanceScreen" component={LecturerViewAttendanceScreen} />
                                    <Stack.Screen name="LecturerStudentAttendanceDetailsScreen" component={LecturerStudentAttendanceDetailsScreen} />
                                    <Stack.Screen name="LectuereModuleAttendanceScreen" component={LecturerModuleAttendanceScreen} />
                                    <Stack.Screen name="LectuerAttendanceScreen" component={LecturerAttendanceScreen} />


                                </>
                            )}
                            {user.role === 'student' && (
                                <>
                                    <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} />
                                    <Stack.Screen name="ViewAttendance" component={ViewAttendanceScreen} />
                                    <Stack.Screen name="StudentAttendance" component={StudentAttendanceScreen} />
                                    <Stack.Screen name="StudentAttendanceDetailsScreen" component={StudentAttendanceDetailsScreen} />
                                </>
                            )}
                            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                        </>
                    ) : (
                        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                    )
                ) : (
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
