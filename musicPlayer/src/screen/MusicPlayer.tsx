import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View
} from 'react-native';
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player';
import { ControlCenter } from '../components/ControlCenter';
import SongInfo from '../components/SongInfo';
import SoundSlider from '../components/soundSlider';
import { musicLists } from '../constant';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = React.useState<Track | null>();


  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event)=> {
    switch (event.type){
        case Event.PlaybackActiveTrackChanged:
            const playingTrack = await TrackPlayer.getTrack(Number(event.index))
            setTrack(playingTrack)
            break;
    }
  })

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={musicLists}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track} />
      <SoundSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
