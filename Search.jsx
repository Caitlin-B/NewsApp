import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Header from "./Header";
import { formatDate } from "./utils";

class Search extends Component {
  state = {
    q: "",
    DateFrom: null,
    DateTo: null,
    showDateFromPicker: false,
    showDateToPicker: false,
    qError: false,
    showHelp: false
  };

  render() {
    const { navigation } = this.props;
    const {
      showDateToPicker,
      showDateFromPicker,
      DateFrom,
      DateTo,
      q,
      showHelp
    } = this.state;

    return (
      <View>
        <Header navigation={navigation} />
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Find news articles from now and then, all in one place.
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Search"
            value={q}
            onChangeText={input => this.handleInput(input, "q")}
          />
          {!!this.state.qError && (
            <Text style={{ color: "red", marginLeft: 20 }}>
              {this.state.qError}
            </Text>
          )}
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="From date"
            value={DateFrom && formatDate(DateFrom.toString(), 'short')}
            editable={!showDateFromPicker}
            onFocus={() => {
              this.handleDatePress("DateFrom");
            }}
          />
          <DateTimePicker
            isVisible={showDateFromPicker}
            mode="date"
            onConfirm={input => this.handleInput(input, "DateFrom")}
            onCancel={() => this.handleDatePickerHide("DateFrom")}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="To date"
            value={DateTo && formatDate(DateTo.toString(), 'short')}
            editable={!showDateToPicker}
            onFocus={() => {
              this.handleDatePress("DateTo");
            }}
          />
          <DateTimePicker
            isVisible={showDateToPicker}
            mode="date"
            onConfirm={input => this.handleInput(input, "DateTo")}
            onCancel={() => this.handleDatePickerHide("DateTo")}
          />
          <TouchableHighlight
            onPress={this.handleSearchPress}
            style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
          <View style={styles.infoContainer}>
            {showHelp === true ? (
              <Text style={styles.infoText}>
                Start searching the news by entering a search term. Narrow down
                your search by searching between specific dates.
              </Text>
            ) : (
              <TouchableHighlight
                onPress={() => {
                  this.setState({ showHelp: true });
                }}>
                <Text style={styles.infoText}>Help</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </View>
    );
  }

  handleInput = (input, type) => {
    this.setState({ [type]: input });

    if (type !== "q") {
      this.handleDatePickerHide(type);
    }
  };

  handleDatePress = type => {
    this.setState({
      [`show${type}Picker`]: true
    });
  };

  handleDatePickerHide = type => {
    this.setState({
      [`show${type}Picker`]: false
    });
  };

  handleSearchPress = () => {
    const { q, DateFrom, DateTo } = this.state;

    if (q === "") {
      this.setState(() => ({ qError: "Please enter a search query." }));
    } else {
      this.setState({
        q: "",
        DateFrom: null,
        DateTo: null,
        qError: false,
        showHelp: false
      });
      this.props.navigation.navigate("NewsList", { q, DateFrom, DateTo });
    }
  };
}

const styles = StyleSheet.create({
  introContainer: {
    alignItems: "center",
    marginLeft: 18,
    marginRight: 18,
    marginTop: 10,
    justifyContent: "center"
  },
  introText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F15025"
  },
  infoContainer: {
    alignItems: "center",
    margin: 15
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F15025"
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  text: {
    height: 50,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10
  },
  borderTop: {
    borderColor: "#edeeef",
    borderTopWidth: 0.5
  },
  button: {
    height: 50,
    backgroundColor: "#F15025",
    borderColor: "#F15025",
    alignSelf: "stretch",
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

export default Search;
