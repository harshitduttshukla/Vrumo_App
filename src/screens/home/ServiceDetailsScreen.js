import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../utils/colors';

export default function ServiceDetailsScreen({ route, navigation }) {
    const { service } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image style={styles.image} source={{ uri: service.image }} />
                <View style={styles.content}>
                    <Text style={styles.title}>{service.name}</Text>
                    <Text style={styles.price}>₹{service.price}</Text>
                    <Text style={styles.desc}>Experience the best-in-class service at your doorstep.</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <PrimaryButton title="Book Service" onPress={() => navigation.navigate('Booking', { service })} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    image: { width: '100%', height: 250 },
    content: { padding: 24 },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.text },
    price: { fontSize: 24, fontWeight: '900', color: colors.primary, marginTop: 8 },
    desc: { fontSize: 15, color: colors.textLight, marginTop: 16 },
    footer: { padding: 24, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border }
});
