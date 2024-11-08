import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext({
  items: [],
  addToCart: (items) => {},
  removeFromCart: (id) => {},
<<<<<<< HEAD
  newAddToCart: (sessionId, productId, quantity) => {},
  newRemoveFromCart: (productId, quantity) => {},
  cart: [],
=======
>>>>>>> 82d373536602821909450d356afe2cd884a575b6
});

function cartReducer(state, action) {
  if (action.type === "ADD_TO_CART") {
    const cartItemIndex = state.items.findIndex(
      (item) => item._id === action.item._id
    );
    const updatedItems = [...state.items];
    if (cartItemIndex > -1) {
      const existingItem = state.items[cartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[cartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const cartItemIndex = state.items.findIndex(
      (item) => item._id === action.id
    );
    const existingItem = state.items[cartItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(cartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[cartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchAction] = useReducer(cartReducer, { items: [] });

  function addToCart(item) {
    dispatchAction({ type: "ADD_TO_CART", item });
  }

  function removeFromCart(id) {
    dispatchAction({ type: "REMOVE_FROM_CART", id });
  }

<<<<<<< HEAD
  const ctxValue = {
    items: cart.items,
    addToCart,
    removeFromCart,
  };
=======
  const ctxValue = { items: cart.items, addToCart, removeFromCart };
>>>>>>> 82d373536602821909450d356afe2cd884a575b6

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
