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
  TouchableHighlightBase,
} from "react-native";
import randomColor from "randomcolor";
import { connect } from "react-redux";
import { fetchPhotos, addPhoto, removePhoto } from "../../redux/photos/actions";
import store from "../../redux";

const { ImageGlam } = glamorous;

const threeAssignmentImages = [];

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
    index: 0,
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
      albumId: this.state.index,
      title: title[this.state.index],
      url: url[this.state.index],
      thumbnailUrl: thumbnail[this.state.index],
    };
    if (this.state.index === 2) {
      this.state.index = 0;
    } else {
      this.state.index++;
    }
    console.log(this.state.index);
    this.props.addPhoto(photo);
  };

  removePhoto = (photo) => {
    this.props.removePhoto(photo);
  };

  render() {
    console.log(JSON.stringify(this.props.photos, null, 2));
    return (
      <SafeAreaView style={styles.container}>
        <AlbumReq style={styles.toolbar}>
          {JSON.stringify(album[this.state.index])}
        </AlbumReq>
        <TitleReq style={styles.title}>
          {JSON.stringify(title[this.state.index])}
        </TitleReq>
        <URLReq style={styles.url}>
          {JSON.stringify(url[this.state.index])}
        </URLReq>
        <TheumbnailURLReq style={styles.thumbnail}>
          {JSON.stringify(thumbnail[this.state.index])}
        </TheumbnailURLReq>

        <ScrollView>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.button} onPress={this.addPhoto}>
              <Text style={styles.buttonText}>Next</Text>
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
                        source={{ uri: url[this.state.index] }}
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

const album = ["Album 1", "Album 2", "Album 3"];

const title = ["Picture 1", "Picture 2", "Picture 3"];

const url = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/?blur=1",
];

const thumbnail = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/?blur=1",
];

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
  title: {
    backgroundColor: "pink",
    borderWidth: 3,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "black",
    padding: 10,
  },
  url: {
    backgroundColor: "#fcd4f4",
    borderWidth: 3,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "black",
    padding: 10,
  },
  thumbnail: {
    backgroundColor: "#f5b0e6",
    borderWidth: 3,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "black",
    padding: 10,
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
