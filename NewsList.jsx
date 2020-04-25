import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as api from "./api";
import NewsCard from "./NewsCard";
import Header from "./Header";

class NewsList extends Component {
  state = {
    results: [],
    status: "loading",
    currentPage: 0,
    pages: 0,
    total: 0
  };

  render() {
    const { results, status, total } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        {status === "loading" ? (
          <Text>loading...</Text>
        ) : (
          <FlatList
            data={results}
            renderItem={({ item }) => <NewsCard article={item} />}
            ListFooterComponent={this.renderViewMoreButton}
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    const { q, DateFrom, DateTo } = this.props.route.params;

    api
      .getArticles(q, DateFrom, DateTo, 1)
      .then(({ results, status, pages, total }) => {
        this.setState({ results, status, currentPage: 1, pages, total });
      });
  }

  renderViewMoreButton = () => {
    //if currentpage = pages, dont render this button
    const { currentPage, pages } = this.state;

    if (currentPage !== pages) {
      return (
        <View>
          <TouchableHighlight
            onPress={this.handleViewMorePress}
            style={styles.button}>
            <Text style={styles.buttonText}>See More</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.endText}>End of List</Text>
        </View>
      );
    }
  };

  handleViewMorePress = () => {
    const { q, DateFrom, DateTo } = this.props.route.params;
    const { currentPage } = this.state;

    api
      .getArticles(q, DateFrom, DateTo, currentPage + 1)
      .then(({ results, status, pages, total }) => {
        this.setState(currentState => {
          return {
            results: currentState.results.concat(results),
            status,
            currentPage: currentState.currentPage + 1,
            pages,
            total
          };
        });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 50,
    backgroundColor: "#CED0CE",
    borderColor: "#CED0CE",
    alignSelf: "stretch",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  endText: {
    color: "#CED0CE",
    fontSize: 15,
    marginBottom: 1
  }
});

export default NewsList;
