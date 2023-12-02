import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet
} from 'react-native';
import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../CartContext';
export function ProductDetails({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});

  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch the product when productId changes
    const fetchProduct = async () => {
      const productData = await getProduct(productId);
      setProduct(productData);
    };

    fetchProduct();
  }, [productId]); // Specify productId as a dependency


  function onAddToCart() {
    addItemToCart(product.id);
  }

  return (
    <SafeAreaView>
      
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={product.image} />
        </View>
        <View style={styles.infoContainer}>
        
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button
            onPress={onAddToCart}
            title="Add to cart" />
        </View>
      
    </SafeAreaView>
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
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '30%', // Adjust the width as needed
    height: undefined, // This will calculate the height based on the aspect ratio
    aspectRatio: 1, // Maintain the original aspect ratio
    borderRadius: 8,
    marginBottom: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
