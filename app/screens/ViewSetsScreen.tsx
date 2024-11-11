import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { RootStackParamList } from '@/app/screens/LoginScreen';
import { DJSet } from '@/app/models/DJ';

type ViewSetsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewSets'>;

interface Props {
    navigation: ViewSetsScreenNavigationProp;
}

const ViewSetsScreen: FC<Props> = ({ navigation }) => {
    const [sets, setSets] = useState<DJSet[]>([]);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('djs')
                .doc(user.uid)
                .collection('sets')
                .orderBy('date', 'desc')
                .onSnapshot(
                    (querySnapshot) => {
                        const setsData: DJSet[] = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            date: doc.data().date.toDate(),
                            fee: doc.data().fee,
                            percentage: doc.data().percentage,
                            tracks: doc.data().tracks || [],
                        }));
                        setSets(setsData);
                    },
                    (error) => {
                        console.error('Error fetching sets: ', error);
                    }
                );

            return () => unsubscribe();
        }
    }, []);

    const renderItem = ({ item }: { item: DJSet }) => {
        const userId = firebase.auth().currentUser?.uid;

        if (!userId) {
            console.error("User ID is undefined");
            return null;
        }

        return (
            <TouchableOpacity
                style={styles.setItem}
                onPress={() => navigation.navigate('SetDetails', { setId: item.id, userId })}
            >
                <Text style={styles.setTitle}>Set on {item.date.toDateString()}</Text>
                <Text style={styles.setInfo}>Fee: ${item.fee.toFixed(2)}</Text>
                <Text style={styles.setInfo}>Percentage: {item.percentage}%</Text>
                <Text style={styles.setInfo}>Tracks: {item.tracks.length}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Sets</Text>
            <FlatList
                data={sets}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>You have no sets yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
        textAlign: 'center',
    },
    setItem: {
        backgroundColor: '#1F1B24',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    setTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    setInfo: {
        fontSize: 16,
        color: '#cccccc',
        marginTop: 4,
    },
    emptyText: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ViewSetsScreen;