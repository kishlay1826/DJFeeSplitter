import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/screens/LoginScreen';
import { Artist, DJSet, Track } from '@/app/models/DJ';

type CreateSetScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateSet'>;

interface Props {
    navigation: CreateSetScreenNavigationProp;
}

const CreateSetScreen: FC<Props> = ({ navigation }) => {
    const [fee, setFee] = useState('');
    const [percentage, setPercentage] = useState('');
    const [tracks, setTracks] = useState<Track[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [artistResults, setArtistResults] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [trackTitle, setTrackTitle] = useState('');

    const searchArtists = async () => {
        if (!searchQuery.trim()) {
            alert('Please enter a search term.');
            return;
        }
        const queryLowerCase = searchQuery.toLowerCase();
        try {
            const snapshot = await firebase.firestore().collection('djs').orderBy('name').get();
            const artists = snapshot.docs
                .map((doc) => new Artist(doc.id, doc.data().name))
                .filter((artist) => artist.name.toLowerCase().includes(queryLowerCase));
            setArtistResults(artists);
            if (artists.length === 0) {
                alert('No DJs found. Try a different search term.');
            }
        } catch (error) {
            console.error('Error searching DJs:', error);
            alert('An error occurred while searching for DJs.');
        }
    };

    const addTrack = () => {
        if (selectedArtist && trackTitle) {
            const newTrack = new Track(Math.random().toString(), trackTitle, selectedArtist);
            setTracks([...tracks, newTrack]);
            setTrackTitle('');
            setSelectedArtist(null);
            setArtistResults([]);
            setSearchQuery('');
        } else {
            alert('Please select a DJ and enter a track title.');
        }
    };

    const saveSet = async () => {
        const user = firebase.auth().currentUser;
        if (!user) {
            alert('User is not logged in.');
            return;
        }
        const setId = firebase.firestore().collection('djs').doc(user.uid).collection('sets').doc().id;
        const setData = new DJSet(setId, new Date(), parseFloat(fee), parseFloat(percentage), tracks);
        try {
            await firebase.firestore()
                .collection('djs')
                .doc(user.uid)
                .collection('sets')
                .doc(setId)
                .set({
                    id: setData.id,
                    date: setData.date,
                    fee: setData.fee,
                    percentage: setData.percentage,
                    tracks: setData.tracks.map((track) => ({
                        id: track.id,
                        title: track.title,
                        artist: {
                            id: track.artist.id,
                            name: track.artist.name,
                        },
                    })),
                });
            alert('Set and artist plays saved successfully!');
            navigation.goBack();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Set</Text>
            <TextInput
                placeholder="Total fee received ($)"
                placeholderTextColor="#888"
                value={fee}
                onChangeText={setFee}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Percentage to split (%)"
                placeholderTextColor="#888"
                value={percentage}
                onChangeText={setPercentage}
                keyboardType="numeric"
                style={styles.input}
            />
            <Text style={styles.subtitle}>Add Tracks</Text>
            <TextInput
                placeholder="Search DJ"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text.trim())}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={searchArtists}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <FlatList
                data={artistResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedArtist(item)} style={styles.artistItem}>
                        <Text style={styles.artistText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                style={{ maxHeight: 150 }}
            />
            {selectedArtist && (
                <Text style={styles.selectedArtist}>Selected DJ: {selectedArtist.name}</Text>
            )}
            <TextInput
                placeholder="Track Title"
                placeholderTextColor="#888"
                value={trackTitle}
                onChangeText={setTrackTitle}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={addTrack}>
                <Text style={styles.buttonText}>Add Track</Text>
            </TouchableOpacity>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.trackItem}>
                        {item.title} by {item.artist.name}
                    </Text>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={saveSet}>
                <Text style={styles.buttonText}>Save Set</Text>
            </TouchableOpacity>
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
    subtitle: {
        fontSize: 18,
        color: '#cccccc',
        marginVertical: 12,
    },
    input: {
        backgroundColor: '#333333',
        color: '#ffffff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
    },
    artistItem: {
        padding: 8,
        backgroundColor: '#444444',
        marginVertical: 4,
        borderRadius: 8,
    },
    artistText: {
        color: '#ffffff',
    },
    selectedArtist: {
        color: '#888888',
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#BB86FC',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    trackItem: {
        color: '#ffffff',
        padding: 4,
    },
});

export default CreateSetScreen;