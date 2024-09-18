import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import { musicLists } from "./src/constant";

export async function setupPlayer(){
    let isSetup = false
    try {
        await TrackPlayer.getActiveTrack();
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally{
        return isSetup
    }
}


export async function addTrack(){
    await TrackPlayer.add(musicLists);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}


export async function playBackService () {
    TrackPlayer.addEventListener(Event.RemotePlay, ()=>{
        TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemotePause, ()=>{
        TrackPlayer.pause();
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, ()=>{
        TrackPlayer.skipToPrevious();
    })
    TrackPlayer.addEventListener(Event.RemoteNext, ()=>{
        TrackPlayer.skipToNext();
    })
} 