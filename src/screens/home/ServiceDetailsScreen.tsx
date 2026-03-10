import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ServiceDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServiceDetails'>;
type ServiceDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;

interface Props {
    navigation: ServiceDetailsScreenNavigationProp;
    route: ServiceDetailsScreenRouteProp;
}

const ServiceDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const { service } = route.params;

    const handleContinue = () => {
        navigation.navigate('Booking', { service });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={service.image} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>{service.name}</Text>
                    <Text style={styles.price}>₹{service.price}</Text>
                    <Text style={styles.description}>{service.description}</Text>
                    <View style={styles.benifits}>
                        <Text style={styles.benifitsTitle}>What's Included:</Text>
                        <Text style={styles.benifitItem}>✓ High Quality Products</Text>
                        <Text style={styles.benifitItem}>✓ Experienced Professionals</Text>
                        <Text style={styles.benifitItem}>✓ Doorstep Convenience</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <CustomButton title="Continue to Book" onPress={handleContinue} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    details: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FBBF24',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 24,
    },
    benifits: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    benifitsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 12,
    },
    benifitItem: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E2E8F0',
    },
});

export default ServiceDetailsScreen;
