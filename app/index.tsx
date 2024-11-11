import {SafeAreaView} from "react-native";
import MainStackNavigator from "@/app/navigation/MainStackNavigator";
import { Stack } from "expo-router";

export default function Index() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
                <MainStackNavigator />
            </SafeAreaView>
        </>
    );
}
