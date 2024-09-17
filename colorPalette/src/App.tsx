import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const Container = ({
  backgroundColor,
}: {
  backgroundColor: string;
}): JSX.Element => {

    const copyTextToClipboard = () =>{
        if(backgroundColor){
            Clipboard.setString(backgroundColor);
            if(Platform.OS === 'android'){
                ToastAndroid.show(`Color ${backgroundColor} Copied to clipboard`, ToastAndroid.SHORT)
            }
        }
    }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.box, {backgroundColor}]} onPress={copyTextToClipboard}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {backgroundColor}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const App = () => {
  const [colors, setColors] = React.useState<Array<string>>([]);



  const generateRandomColor = (length: number = 24) => {
    const randomColor = [];
    console.log('Hello world');
    for (let i = 0; i < length; i++) {
      let color =
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0');
      randomColor.push(color);
    }
    setColors(randomColor);
  };

  React.useEffect(() => {
    generateRandomColor();
  }, []);
  return (
    <SafeAreaView>
      <View style={{height: '100%', width: '100%'}}>
        <Text style={styles.heading}>Random color palette generator</Text>
        <View style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
          <TouchableOpacity style={styles.btn} onPress={()=>generateRandomColor()}>
            <Text style={{color: 'white', textAlign: 'center'}}> Refresh</Text>
          </TouchableOpacity>
        <Text style={{color:'red', textAlign:'center', fontSize:12}}>Click on color to copy color code</Text>
        </View>
        <ScrollView>
          <View style={styles.main}>
            {colors?.map((color, idx) => {
              return <Container backgroundColor={color} key={idx} />;
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: '10%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '8%',
    color: 'royalblue',
  },
  container: {
    width: 110,
    height: 110,
    borderStyle: 'solid',
    borderColor: '#dadada',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 6,
  },
  box: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    width: '40%',
    borderRadius: 8,
  },
});
