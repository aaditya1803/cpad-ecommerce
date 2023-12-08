import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../CartContext';

export function Cart({ navigation }) {
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const { addItemToCart, removeItemFromCart, reduceQuantityOfItem } = useContext(CartContext);

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });

    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {total}</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {item.product.name} x {item.qty}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button title="+" onPress={() => addItemToCart(item.product.id)} />
          <Button title="-" onPress={() => reduceQuantityOfItem(item.product.id)} />
          <Button title="Remove item" onPress={() => removeItemFromCart(item.product.id)} />
        </View>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
      </View>
    );
  }

  function checkout() {
    const billItems = items.map((item) => `${item.product.name} x ${item.qty} - $${item.totalPrice}`);
    const total = getTotalPrice();
    const billText = `Bill:\n\n${billItems.join('\n')}\n\nTotal: $${total}`;
    navigation.navigate('Checkout', { billText, total });
  }

  return (
    <View>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.product.id)}
        ListFooterComponent={Totals}
      />
      <Button title="Checkout" onPress={checkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333',
    flex: 1,
  },
  lineRight: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
