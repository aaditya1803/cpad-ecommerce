import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '../components/Product.js';
import { getProducts } from '../services/ProductsService.js';
export function ProductsList ({navigation}) {
function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use an asynchronous function to fetch products and update the state
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    // Call the asynchronous function
    fetchProducts();
  }, []);
  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
  );
}
const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
