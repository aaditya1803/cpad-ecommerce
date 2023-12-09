import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';

export function Product({ name, price, image, onPress }) {
  const imageWidth = 260; // Set your desired width
  const imageHeight = 260; // Set your desired height

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image style={{ ...styles.thumb, width: imageWidth, height: imageHeight }} source={image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
    flexDirection: 'column', // Ensure vertical alignment
  },
  imageContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden', // Clip overflowing content
  },
  thumb: {
    width: '100%',
  },
  textContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
});
