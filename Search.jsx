import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  TouchableHighlight
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Header from "./Header";
import { formatDate } from "./utils";

class Search extends Component {
  state = {
    q: null,
    starRating: null,
    DateFrom: "",
    DateTo: "",
    showDateFromPicker: false,
    showDateToPicker: false
  };

  render() {
    const { navigation } = this.props;
    const {
      showDateToPicker,
      showDateFromPicker,
      DateFrom,
      DateTo
    } = this.state;

    return (
      <View>
        <Header navigation={navigation} />
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Search"
            onChangeText={input => this.handleInput(input, "q")}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="From date"
            value={formatDate(DateFrom.toString())}
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
            value={formatDate(DateTo.toString())}
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

    this.props.navigation.navigate("NewsList", { q, DateFrom, DateTo });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
    // borderWidth: 1,
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
