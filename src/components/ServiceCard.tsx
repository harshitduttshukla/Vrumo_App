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
            <Image source={{ uri: service.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{service.name}</Text>
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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    image: {
        height: 150,
        width: '100%',
        resizeMode: 'cover',
    },
    details: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FBBF24',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#0F172A',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ServiceCard;
