import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  Button,
  StyleSheet
} from 'react-native';
import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../CartContext';

export function ProductDetails({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const [buttonText, setButtonText] = useState('Add to cart');
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const { addItemToCart, reduceQuantityOfItem, increaseQuantityOfItem } = useContext(CartContext);

  useEffect(() => {
    // Fetch the product when productId changes
    const fetchProduct = async () => {
      const productData = await getProduct(productId);
      setProduct(productData);
    };

    fetchProduct();
  }, [productId]);

  // function getItemInCart(items, productId) {
  //   return items.find((item) => item.id === productId);
  // }

  function onAddToCart() {
    if (buttonText === 'Go to cart') {
      navigation.navigate('Cart');
    } else {
      addItemToCart(product.id);
      setButtonText('Go to cart');
      setAddedToCart(true);
    }
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

        <View style={styles.buttonContainer}>
          <Button onPress={onAddToCart} title={buttonText} style={[styles.buttonStyle, styles.addToCartButton]} />
          {addedToCart && (
            <View style={styles.quantityButtonsContainer}>
              <Button title='+1' style={styles.buttonStyle} onPress={() => increaseQuantityOfItem(product.id)} />
              <Button title='-1' style={styles.buttonStyle} onPress={() => reduceQuantityOfItem(product.id)} />
            </View>
          )}
        </View>
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
  buttonStyle: {
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  addToCartButton: {
    fontSize: 14, // Adjust the font size for the "Add to Cart" button
  },

  quantityButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '30%',
    height: undefined,
    aspectRatio: 1,
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
