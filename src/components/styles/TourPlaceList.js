import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    place: {
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 4,
        color: '#408ba4',
        backgroundColor: '#e6e6e6',
    },
    detail: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
    },
    numberContainer: {
        paddingRight: 5,
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#71b3c1',
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 2,
        borderColor: '#459db4',
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
