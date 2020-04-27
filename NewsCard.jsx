import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Linking } from "expo";
import { formatDateFull } from "./utils";

const NewsCard = ({ article }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleText}>{article.webTitle}</Text>
      <Text>
        {article.sectionName} • {formatDateFull(article.webPublicationDate)}
      </Text>
      <TouchableHighlight
        onPress={() => {
          Linking.openURL(article.webUrl);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>View full article</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontWeight: "bold",
    padding: 5
  },
  button: {
    height: 30,
    backgroundColor: "#F15025",
    borderColor: "#F15025",
    width: 300,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
});

export default NewsCard;
