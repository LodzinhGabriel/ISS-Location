import React, { Component } from "react";
import { Text, View, StyleSheet, Platform, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native';
const bgImage = require("../assets/bg_image.png");
const issIcon = require("../assets/iss_icon.png");
const meteorIcon = require("../assets/meteor_icon.png");

export default class HomeScreen extends Component {
    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}/>
                <ImageBackground source = {bgImage} style = {styles.backgroundImage}/>
                <View style = {styles.titleBar}>
                    <Text style = {styles.titleText}>App Rastreio EEI</Text>
                </View>
                <TouchableOpacity style = {styles.routeCards} onPress = {() => this.props.navigation.navitgate("ISSLocation")}>
                    <Text style = {styles.routeText}>Localização EEI</Text>
                    <Text style = {styles.knowMore}>{"Saiba Mais -->"}</Text>
                    <Text style = {styles.bgDigit}>1</Text>
                    <Image source = {issIcon} style = {styles.iconImage}></Image>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.routeCards} onPress = {() => this.props.navigation.navitgate("Meteors")}>
                    <Text style = {styles.routeText}>Meteoros</Text>
                    <Text style = {styles.knowMore}>{"Saiba Mais -->"}</Text>
                    <Text style = {styles.bgDigit}>2</Text>
                    <Image source = {meteorIcon} style = {styles.iconImage}></Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
    },
    routeCards: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 300,
    },
    routeText: {
        fontWeight: "bold",
        fontSize: 35,
        color: "black",
        marginTop: 75,
        paddingLeft: 30,
    },
    iconImage:{
        position:"absolute",
        height:200,
        width:200,
        resizeMode:"contain",
        right:20,
        top:-80
      },
    knowMore:{
        paddingLeft:30,
        color:"red",
        fontSize:15
    },
    bgDigit: {
        position:"absolute",
        color:"rgba(183,183,183,0.5)",
        fontSize:150,
        right:20,
        bottom:-15,
        zIndex:-1
    }

    
});