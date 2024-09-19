import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const ControlCenter = () => {

    const playBackStatus = usePlaybackState();

    const skipToNextTrack = async () =>{
        await TrackPlayer.skipToNext();
    } 
    const skipToPreviousTrack = async () =>{
        await TrackPlayer.skipToPrevious();
    } 

    const TogglePlayer = async (playBack:State) =>{
        const currentTrack = await TrackPlayer.getActiveTrack();

        if(currentTrack !== undefined){
            if(playBack === State.Paused || playBack === State.Ready){
                await TrackPlayer.pause();
            }else{
                await TrackPlayer.play()
            }
        }
    }

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPreviousTrack}>
        <Icon style={styles.icon} name="skip-previous" size={40}/>
      </Pressable>
      {/* @ts-ignore */}
      <Pressable onPress={()=>TogglePlayer(playBackStatus)}>
        {/* @ts-ignore */}
        <Icon style={styles.icon} name={playBackStatus === State.Playing ? "pause" : "play-arrow"}  size={75}/>
      </Pressable>
      <Pressable onPress={skipToNextTrack}>
        <Icon style={styles.icon} name="skip-next" size={40}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
