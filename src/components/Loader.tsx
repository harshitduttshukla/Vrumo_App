import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FBBF24" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});

export default Loader;
