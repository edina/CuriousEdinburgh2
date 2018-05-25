import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#268da8',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        alignSelf: 'center',
        top: 4,
        padding: 5,
    },
    close: {
        backgroundColor: 'transparent',
        color: 'white',
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    images: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
    },
    mediaContainer: {
        margin: 5,
        borderRadius: 10,
    },
    media: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    details: {
        borderWidth: 10,
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
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    link: {
        color: '#679fad',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    share: {
        padding: 10,
    },
    shareLink: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
