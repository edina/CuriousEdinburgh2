import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    page: {

    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#268da8',
    },
    left: {
        flex: 1,
    },
    close: {
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#268da8',
        color: 'white',
    },
    title: {
        flex: 3,
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    right: {
        flex: 1,
    },
    images: {
        flexDirection: 'row',
        padding: 20,
    },
    imageContainer: {
        paddingRight: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        paddingRight: 10,
    },
    details: {
        borderWidth: 20,
        borderColor: '#efeff4',
    },
    address: {
        color: '#679fad',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    description: {
        paddingTop: 10,
        fontSize: 18,
        padding: 10,
    },
    linksTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
    },
    link: {
        color: '#679fad',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
});
