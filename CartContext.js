import React, { createContext, useState } from 'react';
import { getProduct } from './services/ProductsService.js';
export const CartContext = createContext();
export function CartProvider(props) {
  const [items, setItems] = useState([]);

  async function addItemToCart(id) {
    const product = await getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));
      if (!item) {
        return [...prevItems, {
          id,
          qty: 1,
          product,
          totalPrice: product.price
        }];
      }
      else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }
  function removeItemFromCart(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function reduceQuantityOfItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (item.qty > 1) {
            item.qty--;
            item.totalPrice -= item.product.price;
          } else {
            removeItemFromCart(id);
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
  }
  function increaseQuantityOfItem(id) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.qty++;
          item.totalPrice += item.product.price;
        }
        return item;
      });
    });
  }
  function getItemsCount() {
    return items.reduce((sum, item) => (sum + item.qty), 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }

  return (
    <CartContext.Provider
      value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice, removeItemFromCart, reduceQuantityOfItem, increaseQuantityOfItem }}>
      {props.children}
    </CartContext.Provider>
  );
}
