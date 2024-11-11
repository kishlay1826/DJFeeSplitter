import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';
import { RouteProp } from '@react-navigation/native';
import { Track } from '@/app/models/DJ';
import { RootStackParamList } from '@/app/screens/LoginScreen';

type SetDetailsScreenRouteProp = RouteProp<RootStackParamList, 'SetDetails'>;

interface Props {
    route: SetDetailsScreenRouteProp;
}

const SetDetailsScreen: React.FC<Props> = ({ route }) => {
    const { setId, userId: djId } = route.params;
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('djs')
            .doc(djId)
            .collection('sets')
            .doc(setId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const loadedTracks = data?.tracks || [];
                    setTracks(loadedTracks);
                }
            });

        return () => unsubscribe();
    }, [setId, djId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Details</Text>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.trackItem}>
                        <Text style={styles.trackText}>
                            {item.title} by {item.artist?.name || 'Unknown Artist'}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No tracks in this set.</Text>}
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
    trackItem: {
        backgroundColor: '#1F1B24',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    trackText: {
        color: '#ffffff',
        fontSize: 16,
    },
    emptyMessage: {
        color: '#888888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SetDetailsScreen;