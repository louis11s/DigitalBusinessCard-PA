import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.initials}>
      <Text style={styles.title}>Name:</Text>
      <Text style={styles.title}>Vorname:</Text>
      <Text style={styles.title}>Telefonnummer:</Text>
      <Text style={styles.title}>E-Mail:</Text>
      <Text style={styles.title}>Firma:</Text>
      <Text style={styles.title}>Website:</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  initials:{
    backgroundColor:'#f9fafb',
    borderRadius:25,
    width:'100%',
  },
  title: {
    fontSize: 20,
    marginTop:20,
    marginLeft:20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
