import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    place: {
        padding: 10,
    },
    title: {
        flex: 12,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#408ba4',
        textAlign: 'center',
    },
    detail: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
    },
    numberContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    number: {
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        borderWidth: 2,
        borderColor: '#459db4',
        backgroundColor: '#1d8daa',
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        textAlign: 'center',
        color: '#ffffff',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        padding: 10,
        fontSize: 18,
    },
});
