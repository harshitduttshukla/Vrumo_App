import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Service } from '../types/service';

interface Props {
    service: Service;
    onPress: () => void;
}

const ServiceCard: React.FC<Props> = ({ service, onPress }) => {
    // Using native react native styles for premium look, as NativeWind setup varies.
    return (
        <View style={styles.card}>
            <Image source={service.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={2}>{service.name}</Text>
                <Text style={styles.price}>₹{service.price}</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    image: {
        height: 120,
        width: '100%',
        resizeMode: 'cover',
    },
    details: {
        padding: 12,
        alignItems: 'center',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 4,
        textAlign: 'center',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F59E0B', 
        marginBottom: 8,
    },
    button: {
        width: '100%',
        backgroundColor: '#0F172A',
        height: 38,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ServiceCard;
