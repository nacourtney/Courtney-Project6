import React, { Component } from "react";
import glamorous from "glamorous-native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import randomColor from "randomcolor";
import { connect } from "react-redux";
import { fetchPhotos, addPhoto, removePhoto } from "../../redux/photos/actions";
import store from "../../redux";

const { ImageGlam } = glamorous;

const Container = glamorous.view({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
});

const Headline = glamorous.text({
  fontSize: 30,
  paddingBottom: 8,
});

const SubHeading = glamorous.text({
  fontSize: 26,
  paddingBottom: 8,
});

const ButtonText = glamorous.text({
  fontSize: 18,
  color: "white",
});

const AlbumReq = glamorous.text({
  fontSize: 20,
  color: "black",
});

const TitleReq = glamorous.text({
  fontSize: 30,
  color: "#4b0954",
});

const URLReq = glamorous.text({
  fontSize: 10,
  color: "#4b0954",
});

const TheumbnailURLReq = glamorous.text({
  fontSize: 10,
  color: "#bf5ecc",
});

const Button = glamorous.touchableHighlight({ padding: 10 }, (props) => ({
  backgroundColor: props.warning ? "red" : "blue",
}));

class Album extends Component {
  state = {
    log: "",
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchPhotos();
      const log = store.getState();
      this.setState({ log });
    }, 2000);
  }

  addPhoto = () => {
    const photo = {
      albumId: 2,
      title: "dolore esse a in eos sed",
      url: `https://via.placeholder.com/600.png/${randomColor().replace(
        "#",
        ""
      )}`,
      thumbnailUrl: `https://via.placeholder.com/150.png/${randomColor().replace(
        "#",
        ""
      )}`,
    };
    this.props.addPhoto(photo);
  };

  removePhoto = (photo) => {
    this.props.removePhoto(photo);
  };

  render() {
    console.log(JSON.stringify(this.props.photos, null, 2));
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>Album</Text>
        <Text style={styles.log}>
          {JSON.stringify(this.state.log, null, 2)}
          {JSON.stringify(this.state.log, null, 3)}
        </Text>

        <ScrollView>
          <Image
            height={250}
            width={250}
            borderRadius={20}
            source={{ uri: "http://placehold.it/250/3B5998" }}
          />

          <Button onPress={() => console.log("Thanks for clicking me!")}>
            <ButtonText onPress={this.addPhoto}>Click Me!</ButtonText>
          </Button>
          <Button
            warning
            onPress={() => console.log(`You shouldn't have clicked me!`)}
          >
            <ButtonText>Don't Click Me!</ButtonText>
          </Button>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.button} onPress={this.addPhoto}>
              <Text style={styles.buttonText}>Add Photo</Text>
            </TouchableOpacity>
            {this.props.photos
              ? this.props.photos.map((photo) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.removePhoto(photo)}
                      key={Math.random()}
                    >
                      <Image
                        style={{ width: 300, height: 300, resizeMode: "cover" }}
                        source={{ uri: photo.url }}
                      />
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
  },
  toolbar: {
    backgroundColor: "deeppink",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  log: {
    fontSize: 15,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: "deeppink",
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotos: () => dispatch(fetchPhotos()),
    addPhoto: (photo) => dispatch(addPhoto(photo)),
    removePhoto: (id) => dispatch(removePhoto(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);
