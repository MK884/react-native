import React from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { addTrack, setupPlayer } from '../musicServices';
import MusicPlayer from './screen/MusicPlayer';



const App = () => {


    const [isPlayerReady, setIsPlayerReady] = React.useState<boolean>(false);


    async function setup(){
        const isSetup = await setupPlayer();

        if(isSetup){
            await addTrack();
        }

        setIsPlayerReady(isSetup);
    }

    React.useEffect(()=>{
        setup()
    },[])


    if(!isPlayerReady){
        return (
            <SafeAreaView>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }


  return (
    <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
