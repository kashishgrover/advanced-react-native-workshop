import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native';
import PostCard from '../components/PostCard';
import color from '../theme/color';

const GET_DATA_URL = 'https://jsonplaceholder.typicode.com/todos/1';

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    try {
      const response = await fetch(GET_DATA_URL);
      const { data } = await response.json();
      this.setState({ isLoading: false, data });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const { navigation } = this.props;
    const { isLoading, data } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Dear Diary
          </Text>
        </View>
        {
          isLoading ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PostCard navigation={navigation} item={item} />
              )}
            />
          )
        }
      </View>
    );
  }
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.greyLighter,
  },
  headerContainer: {
    backgroundColor: color.greyDark,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  headerText: {
    color: color.greyLighter,
    marginLeft: 8,
    fontWeight: '400',
    fontSize: 16,
  },
  activityIndicator: {
    paddingTop: 40,
  },
});
