import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Platform, ImageBackground, Image, Alert, FlatList } from 'react-native';
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";

export default class MeteorScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount(){
        this.getMeteors();
    }

    getMeteors = () =>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=LwfNZzwv5hSB2P6A05GnhQMd3P20LCMECsR3QrMU")
        .then(response => {
            this.setState({
                meteors: response.data.near_earth_objects
            })
            .catch(error => {
                Alert.alert(error.message)
            })
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => {
        let meteor = item;
        let bg_img, speed, size;
        if (meteor.threat_score <= 30 ) {
            bg_img = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 100;
        }else if (meteor.threat_score <= 75) {
            bg_img = require("../assets/meteor_bg2.png")
            speed = require("../assets/meteor_speed3.gif");
            size = 150;
        }else {
            bg_img = require("../assets/meteor_bg3.png")
            speed = require("../assets/meteor_speed3.gif");
            size = 200;
        }
        return(
            <View>
                <ImageBackground souce = {bg_img} style = {styles.backgroundImage}>
                <View styles={styles.gifContainer}>
                    <Image source={speed} style={{ width: size, height: size, alignSelf: "center" }}></Image>
                </View>
                <Text style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}>{item.name}</Text>
                </ImageBackground>

            </View>
        )
    }

    render() {
        if(Object.keys(this.state.meteors).length === 0) {
            return(
                <View style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text>Caregando</Text>
                </View>

            );
        }else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date];
            })
            let meteors = [].concat.apply([], meteor_arr);
            meteors.forEach(function(element){
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000 
                element.threat_score = threatScore
            });
            meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
            })
            meteors = meteors.slice(0, 5)

            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Tela dos Meteoros!</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? statusbar.currentHeight: 0
        
    },
})