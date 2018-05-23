import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1d8daa',
    },
    button: {
        top: 5,
        padding: 4,
    },
    title: {
        top: 2,
        fontSize: 20,
        color: '#ffffff',
    },
    image: {
        flex: 1,
    },
    logo: {
        paddingRight: 4,
    },
    modalOuterView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    modalInnerView: {
        flex: 0,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    touchable: {
        color: '#fffaf0',
    },
});
