import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    map: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#1d8daa',
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        textAlign: 'center',
        color: '#ffffff',
    },
    routing: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    touchable: {
        color: '#fffaf0',
    },
});
