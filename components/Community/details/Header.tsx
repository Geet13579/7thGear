import { StyleSheet, View } from 'react-native'
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.greetContainer}>
                <View style={styles.logoContainer}>
                    <Ionicons name="chevron-back" size={24} color="black" onPress={() => navigation.goBack()} />

                </View>
                <View style={styles.logoContainer}>
                        <Feather name="share-2" size={26} color="black" />
                        <FontAwesome5 name="heart" size={22} color="black" />

                </View>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
    paddingHorizontal: 22
    },
    greetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        gap: 20
    }

})

export default Header