import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    viewRow: { flexDirection: 'row' },
    viewRowCenter: { flexDirection: 'row', alignItems: 'center' },
    viewFlex: { flex: 1 },
    containerBorder: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5
    },
    containerButton: {
        backgroundColor: '#044CDE',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5
    }
});
export default styles;
