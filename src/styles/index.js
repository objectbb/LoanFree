import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containermap_container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "column",
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    app_container: {
        flex: 1,
    },
    personsearch_container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    },
    personsearch_searchtext: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'stretch',
        backgroundColor: '#AEE1F5',
        padding: 5,
        margin: 5,
        opacity: 0.8
    },
    personsearch_searchtext_item: {
        height: 45,
        padding: 2,
        marginBottom: 3
    },
    personsearch_searchtext_item_hobby: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    personsearch_touchablehighlight: {
        opacity: 0.8,
        backgroundColor: '#FDE3A7',
        marginBottom: 3
    },
    personsearch_scrollview: {
        height: '20%',
        alignSelf: 'stretch'
    },
    mapmarker: {
        zIndex: 9999999
    },
    mapmarker_callout: {
        height: 200,
        flex: 1,
        borderRadius: 2
    },
    mapmarker_geocode_callout: {
        marginTop: 5
    },
    mapmarker_fields_callout: {
        fontWeight: 'bold'
    },
    mapmarker_hobby_callout: {
        width: '65%',
        fontSize: 10,
        marginTop: 3
    },
    mapmarker_geocode_row_callout: {
        fontSize: 10,
    },
    mapmarker_scrollview_callout: {
        margin: 2,
        padding: 2,
        borderWidth: 0.5,
        borderColor: '#C0392B',
        height: 70,
        width: '65%'
    },
    mapmarker_view_callout: {},
    mapmarker_header_callout: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
});