import { observer } from "mobx-react-lite";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontSize from "../../styles/fontSize";
import { useStore } from '../../stores';

const WINDOW_WIDTH = Dimensions.get("window").width;
/**
 * PhotoDetailScreen is a screen that handles the views rendered when the user
 * taps on a photo and is navigated to a larger view of the photo.
 *
 * Props:
 * @property {Object} photoStore injected store containing selected photo
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
// @inject("photoStore")
const PhotoDetailScreen = () => {
  const { photoStore } = useStore();
  const { currentPhoto } = photoStore;
  if (!currentPhoto) {
    return <View style={styles.container} />; //render default view if no photo set
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: WINDOW_WIDTH - 10,
            height: WINDOW_WIDTH - 10
          }}
          source={{ uri: currentPhoto.thumbnailUrl }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.photoTitle}>{currentPhoto.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestBlue
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: colors.darkestBlue
  },
  photoTitle: {
    color: colors.lightBlue,
    fontSize: fontSize.large
  }
});

export default observer(PhotoDetailScreen);
