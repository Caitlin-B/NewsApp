import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from "react-native";
import searchIcon from "./assets/search_icon.png";

const Header = ({ navigation }) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Search");
        }}>
          <View style={styles.header}>
        <Text style={styles.headerMainText}>
          NEWS 
        </Text>
        <Image style={styles.searchIcon} source={searchIcon} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#CED0CE",
    flexDirection: "row",
    width: "100%",
    //justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20
    //borderBottomWidth: 5
  },
  headerMainText: {
    // marginTop: "3%",
    marginLeft: "3%",
    fontFamily: "American Typewriter",
    fontSize: 50,
    fontWeight: "bold",
    color: "#F15025"
  },
  searchIcon: {
    marginRight: "3%",
    height: 50,
    width: 50
  }
});

export default Header;
