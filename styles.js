// // styles.js
// import { StyleSheet } from 'react-native';
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//     },
//     itemDetails: {
//         color: 'gray',
//         fontSize: 14,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#333',
//     },
//     inputContainer: {
//         marginBottom: 20,
//     },
//     input: {
//         backgroundColor: 'white',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         borderRadius: 5,
//         marginBottom: 10,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         color: 'black'
//     },
//     picker: {
//         backgroundColor: 'white',
//         marginBottom: 10,
//         borderRadius: 5,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         color: 'black',
//     },
//     button: {
//         backgroundColor: '#007AFF',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     itemContainer: {
//         backgroundColor: 'white',
//         padding: 15,
//         borderRadius: 5,
//         marginBottom: 10,
//         borderColor: '#ddd',
//         borderWidth: 1,
//     },
//     itemName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color: '#333',
//     },
//     itemDescription: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 10,
//     },
//     welcome: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#333',
//     },
//     logoutButton: {
//         backgroundColor: '#FF3B30',
//         marginTop: 20,
//     },
//     attendeeItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     text: {
//         color: '#333',
//     },
//     moduleName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color: '#333',
//     },
//     moduleDescription: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 10,
//     },
//
//     textInput: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 16,
//         paddingHorizontal: 8,
//     },
//     moduleItem: {
//         marginBottom: 16,
//     },
//     attendanceInfo: {
//         flexDirection: 'row',
//         justifyContent:'space-between',
//         alignItems: 'center',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     attendanceText: {
//         color: '#333',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     attendanceInfoValue: {
//         color: '#666',
//         fontSize: 16,
//     },
//     attendanceInfoIcon: {
//         color: '#666',
//         fontSize: 24,
//     },
//     pickerItem: {
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 5,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         color: 'black',
//     },
//     pickerItemText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     checkbox: {
//         marginBottom: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 10,
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         backgroundColor: 'gray',
//     },
//     checkboxText: {
//         color: '#333',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     checkboxIcon: {
//         color: '#333',
//         fontSize: 24,
//         marginBottom: 5,
//     }
//
//
// });
//
// export default styles;
// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    itemDetails: {
        color: 'gray',
        fontSize: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        color: 'black'
    },
    picker: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        color: 'black',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        marginTop: 20,
    },
    attendeeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        color: '#333',
    },
    moduleName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    moduleDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    moduleItem: {
        marginBottom: 16,
    },
    attendanceInfo: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    attendanceText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    attendanceInfoValue: {
        color: '#666',
        fontSize: 16,
    },
    attendanceInfoIcon: {
        color: '#666',
        fontSize: 24,
    },
    pickerItem: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        color: 'black',
    },
    pickerItemText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkbox: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        backgroundColor: 'gray',
    },
    checkboxText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxIcon: {
        color: '#333',
        fontSize: 24,
        marginBottom: 5,
    },
    // New modal styles
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
    // checkbox: {
    //     width: 20,
    //     height: 20,
    //     borderWidth: 1,
    //     borderColor: '#000',
    //     marginLeft: 10,
    // },
    checkboxChecked: {
        backgroundColor: '#000',
    },
});

export default styles;