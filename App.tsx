//React importieren
import React, { useState } from 'react';

//Alle Komponenten importieren die wir brauchen
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

//Alle Libraries importieren die wir brauchen
import AppIntroSlider from 'react-native-app-intro-slider';
import SvgQRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker';
import vCard from 'react-native-vcards';
import { BusinessCard } from './models/BusinessCard';

//Variable für die vCards definieren
const vCards: vCard[] = [];

//Variabeln für den Intro Slider definieren
const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  //Variabeln für die Textinputs und das Bild generieren
  const [name, onChangeName] = React.useState("");
  const [preName, onChangePreName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phonenumber, onChangePhonenumber] = React.useState("");
  const [website, onChangeWebsite] = React.useState("");
  const [company, onChangeCompany] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [companyImage, setCompanyImage] = React.useState(null);
  
  //Die Variabeln um die zwei Bilder aus der Galerie zu wählen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickCompanyImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setCompanyImage(result.uri);
    }
  };

 //Die Funktion die den QR-Code generiert
  function Simple() {
    return <SvgQRCode value="http://door42.ch" />;
  }

  //Funktion die den vCards die Textinput Inhalte mitgibt
  async function initVCard() {
    const contact: vCard = new vCard();

    contact.firstName = preName;
    contact.lastName = name;
    contact.organization = company;
    contact.email = email;
    contact.cellPhone = phonenumber;
    contact.url = website;

    vCards.push(contact);
  }

  //Die drei Start-Up Bildschirme implementieren
  const getTextInput = ({ item }) => {
    if(item.key === 's1') {
      return (
    <View 
      style={[styles.container, {alignItems:'flex-start',}]}>
        <Text style={{fontSize:96, fontWeight:'bold', marginTop:150, marginLeft:30, color:'white',}}>{item.title}</Text>
        <Text style={{fontSize:24, fontWeight:'bold', textAlign:'left', width:'70%', marginLeft:30, color:'white',}}>{item.text}</Text>
        
      </View>
      );
    }
    if(item.key === 's2') {
      return (
    <View 
      style={styles.container}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius:50, }} />}
         <Button title="Wähle dein Profilbild" onPress={pickImage} /> 
        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
         />
         <TextInput
        style={styles.input}
        onChangeText={onChangePreName}
        value={preName}
        placeholder="Vorname"
         />
         <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="E-mail"
         />
         <TextInput
        style={styles.input}
        onChangeText={onChangePhonenumber}
        value={phonenumber}
        placeholder="Telefonnummer"
         />
         <TextInput
        style={styles.input}
        onChangeText={onChangeWebsite}
        value={website}
        placeholder="Webseite"
         />
         <TextInput
        style={styles.input}
        onChangeText={onChangeCompany}
        value={company}
        placeholder="Firma"
         />
      </View>
      );
    } 
    if(item.key === 's3') {
      return (
        <View 
        style={styles.container}>
          <Text style={styles.introTitleStyle}>{item.title}</Text>
          <Button title="Wähle dein Logo" onPress={pickCompanyImage} />
        {companyImage && <Image source={{ uri: companyImage }} style={{ width: 200, height: 200 }} />}
          <Text style={styles.introTextStyle}>{item.text}</Text>
        </View>
      );
    }
    else {
      return (
      <View 
      style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 100,
      }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>          
      </View>
      );
    }
  } 

  //Die Kontaktansicht inplementieren
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.containerContact}>
          <View style={{width:'90%', backgroundColor:'#eee', alignItems:'center', borderRadius:20, borderColor:'white',}}>
            {companyImage && <Image source={{ uri: companyImage }} style={{ width: 150, height: 150, borderRadius:20, borderWidth:2, borderColor:'#acdff4', marginLeft:20, marginRight:20, marginTop:20, marginBottom:20, }} />}
            </View>
            <View style={styles.details}>
            {image && <Image source={{ uri: image }} style={{ width: 75, height: 75, borderRadius:20, borderWidth:2, borderColor:'#acdff4', marginLeft:5, marginTop:20, }} />}
            <View style={{marginTop:-100, alignItems:'flex-start', marginLeft:80, marginBottom:20,}}>
              <Text style={[styles.paragraphStyle, {fontWeight:'bold', fontSize:16,marginTop:10}]}>{name} {preName}</Text>
              <Text style={[styles.paragraphStyle, {marginTop:-35, color:'grey',}]}>{company}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
              <Text style={styles.paragraphStyle}>{phonenumber}</Text>
              <Text style={styles.paragraphStyle}>{email}</Text>
              <Text style={styles.paragraphStyle}>{website}</Text>
            </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#eee', width:'50%', borderRadius:20, paddingBottom:20, paddingTop:20, marginBottom:150, marginTop:50,}}><Simple /></View>
            <Button
              title="Bearbeiten"
              onPress={() => setShowRealApp(false)}
            />
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={getTextInput}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        >
          <TextInput></TextInput>

        </AppIntroSlider>
      )}
    </>
  );
};

export default App;

//Verschiedne Styles angeben
const styles = StyleSheet.create({
  input: {
    height: 40,
    width:"100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:20,
    borderColor:'white',
    color:'grey',
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#acdff4',
    padding: 10,
    paddingBottom:100,
    paddingTop:50,
  },
  containerContact: {
    flex: 1,
    backgroundColor: '#acdff4',
    padding: 10,
    paddingBottom:100,
    textAlign:'left',
    alignItems:'center',
  },
  details:{
    backgroundColor:'#eee',
    borderRadius:20,
    marginTop:20,
    width:'90%',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:50,
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    flexDirection:'column',
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

//Die drei Slides für die Start-Up Screens
const slides = [
  {
    key: 's1',
    text: 'Ich bin deine neue Visitenkarte. Digital. Ohne Papier.',
    title: 'HEY',
  },
  {
    key: 's2',
    title: 'Kontaktdaten eigeben',
  },
  {
    key: 's3',
    title: 'Firmenlogo wählen',
  },
];