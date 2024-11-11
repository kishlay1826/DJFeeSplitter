import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { RootStackParamList } from '@/app/screens/LoginScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
    const logout = () => {
        firebase.auth().signOut().then(() => {
            navigation.replace('Login');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, DJ!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateSet')}>
                <Text style={styles.buttonText}>Create New Set</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewSets')}>
                <Text style={styles.buttonText}>View Sets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Income')}>
                <Text style={styles.buttonText}>View Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#BB86FC',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#CF6679',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 32,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;