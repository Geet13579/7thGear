import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomText from '../../universal/lightText';
import { Feather, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons'

const DATA = [
    {
        id: '1',
        title: 'Treks',
        icon: Feather,
        name: "trending-up"
    },
    {
        id: '2',
        title: 'Biking',
        icon: MaterialCommunityIcons,
        name: "motorbike"
    },
    {
        id: '3',
        title: 'Camping',
        icon: FontAwesome5,
        name: "campground"
    },
    {
        id: '4',
        title: 'Treks',
        icon: FontAwesome
        ,
        name: "flag-checkered"
    },
    {
        id: '5',
        title: 'Retreats',
        icon: MaterialIcons,
        name: "celebration"
    },
    {
        id: '6',
        title: 'Beach',
        icon: MaterialCommunityIcons,
        name: "beach"
    },
];



const App = () => (
    <View >
        <FlatList
            data={DATA}
            horizontal
            showsVerticalScrollIndicator={false}
            decelerationRate={0.99}

            scrollEventThrottle={16}
            removeClippedSubviews={true}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <item.icon name={item.name} size={24} color="#00000" />
                    <CustomText style={{ color: "#94A3B8",fontSize:12 }}>{item.title}</CustomText>
                </View>
            )}
            keyExtractor={item => item.id}
        />

    </View>
);

const styles = StyleSheet.create({
   
    item: {

        backgroundColor: '#f9c2ff',
        paddingRight: 16,
        marginVertical: 8,
    },
    title: {
        fontSize: 24,
    },
    card: {
        height: 55,
        marginRight: 35,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,

    }

});

export default App;