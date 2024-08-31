// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';
//
// const FingerprintAuth = ({ onAuthenticate }) => {
//     const handleBiometricAuth = async () => {
//         const rnBiometrics = new ReactNativeBiometrics();
//         const { available, biometryType } = await rnBiometrics.isSensorAvailable();
//
//         if (available && biometryType === ReactNativeBiometrics.Biometrics) {
//             console.log('Biometric authentication available')
//             // const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
//             // if (success) {
//             //     onAuthenticate();
//             // }
//         } else {
//             console.log('Biometric authentication not available' + ReactNativeBiometrics.Biometrics);
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fingerprint Authentication</Text>
//             <TouchableOpacity onPress={handleBiometricAuth} style={styles.button}>
//                 <Image
//                     source={require('../assets/fingerprint-icon.png')}
//                     style={styles.icon}
//                 />
//                 <Text style={styles.buttonText}>Authenticate with Fingerprint</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     button: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#007AFF',
//         padding: 10,
//         borderRadius: 5,
//     },
//     icon: {
//         width: 24,
//         height: 24,
//         marginRight: 10,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });
//
// export default FingerprintAuth;
//
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
//
// const FingerprintAuth = ({ onAuthenticate }) => {
//     const [isSensorAvailable, setIsSensorAvailable] = useState(false);
//
//     useEffect(() => {
//         checkSensorAvailability();
//         return () => {
//             FingerprintScanner.release();
//         };
//     }, []);
//
//     const checkSensorAvailability = () => {
//         FingerprintScanner.isSensorAvailable()
//             .then(biometryType => {
//                 setIsSensorAvailable(true);
//             })
//             .catch(error => {
//                 console.log('Fingerprint scanner not available:', error);
//                 setIsSensorAvailable(false);
//             });
//     };
//
//     const handleFingerprintAuth = () => {
//         FingerprintScanner.authenticate({
//             description: 'Scan your fingerprint on the device scanner to continue'
//         })
//             .then(() => {
//                 onAuthenticate();
//             })
//             .catch((error) => {
//                 Alert.alert('Authentication Failed', error.message);
//             });
//     };
//
//     if (!isSensorAvailable) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.unavailableText}>Fingerprint authentication is not available on this device.</Text>
//             </View>
//         );
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fingerprint Authentication</Text>
//             <TouchableOpacity onPress={handleFingerprintAuth} style={styles.button}>
//                 <Image
//                     source={require('../assets/fingerprint-icon.png')}
//                     style={styles.icon}
//                 />
//                 <Text style={styles.buttonText}>Authenticate with Fingerprint</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     button: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#007AFF',
//         padding: 10,
//         borderRadius: 5,
//     },
//     icon: {
//         width: 24,
//         height: 24,
//         marginRight: 10,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//     },
//     unavailableText: {
//         color: 'red',
//         textAlign: 'center',
//     },
// });r
//
// export default FingerprintAuth;