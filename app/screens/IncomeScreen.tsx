import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/screens/LoginScreen';

interface Play {
    id: string;
    djId: string;
    djName: string;
    trackTitle: string;
    setId: string;
    income: number;
    playDate: firebase.firestore.Timestamp;
}

const IncomeScreen = () => {
    const [plays, setPlays] = useState<Play[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('artists')
                .doc(user.uid)
                .collection('artist_plays')
                .onSnapshot((snapshot) => {
                    const playData: Play[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    } as Play));
                    setPlays(playData);
                });

            return () => unsubscribe();
        }
    }, []);

    const navigateToSetDetails = (setId: string, djId: string) => {
        navigation.navigate('SetDetails', { setId, userId: djId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Track Plays and Income</Text>
            <FlatList
                data={plays}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.playItem}
                        onPress={() => navigateToSetDetails(item.setId, item.djId)}
                    >
                        <Text style={styles.playText}>DJ: {item.djName}</Text>
                        <Text style={styles.playText}>Track: {item.trackTitle}</Text>
                        <Text style={styles.playText}>Income: ${item.income.toFixed(2)}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No track plays found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#121212' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 16, textAlign: 'center' },
    playItem: {
        backgroundColor: '#1F1B24',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
    },
    playText: { color: '#ffffff', fontSize: 16 },
    emptyMessage: {
        color: '#888888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default IncomeScreen;