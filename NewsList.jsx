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
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} />
        {status === "loading" ? (
          <View style={styles.container}>
            <Text style={styles.startText}>loading...</Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.options}>
            <Text style={styles.total}>No results</Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Search");
              }}>
              <Text style={styles.searchAgain}>New Search</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.options}>
              <Text style={styles.total}>{total} results</Text>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate("Search");
                }}>
                <Text style={styles.searchAgain}>New Search</Text>
              </TouchableHighlight>
            </View>
            <FlatList
              data={results}
              renderItem={({ item }) => <NewsCard article={item} />}
              ListFooterComponent={this.renderViewMoreButton}
            />
          </View>
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
    const { currentPage, pages } = this.state;

    if (currentPage !== pages) {
      return (
        <View>
          <TouchableHighlight
            onPress={this.handleViewMorePress}
            style={styles.button}>
            <Text style={styles.seeMoreButtonText}>See More</Text>
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
    alignItems: "center"
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 3
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
  seeMoreButtonText: {
    color: "#F15025",
    fontSize: 18
  },
  startText: {
    justifyContent: "center",
    fontWeight: "bold"
  },
  searchAgain: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    color: "#F15025",
    fontWeight: "bold"
  },
  total: {
    fontWeight: "bold"
  },
  endText: {
    color: "#CED0CE",
    fontSize: 15,
    marginBottom: 1
  }
});

export default NewsList;
