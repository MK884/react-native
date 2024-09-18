import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { addTrack, setupPlayer } from '../musicServices';



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
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
