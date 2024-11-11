import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firebase from '../firebaseConfig';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    CreateSet: undefined;
    ViewSets: undefined;
    SetDetails: { setId: string; userId: string };
    Income: undefined;
};

const LoginScreen: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                navigation.replace('Home');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DJ Fee Splitter</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                    Register
                </Text>
            </Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#BB86FC',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#1F1B24',
        borderRadius: 8,
        color: '#ffffff',
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#BB86FC',
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        marginTop: 24,
        textAlign: 'center',
    },
    link: {
        color: '#03DAC6',
        fontWeight: 'bold',
    },
});

export default LoginScreen;