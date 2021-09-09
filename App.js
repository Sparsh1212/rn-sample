import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import styles from "./styles";

const App = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [movieList, setMovieList] = useState([]);

  const fetchMovies = async () => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => setMovieList(json.movies))
      .catch((error) => console.error(error.toString()))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>Movies List</Text>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={movieList}
          key={({ item }) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.movieTitle}>{item.title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
