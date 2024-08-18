import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingitem = state.items[existingCartItemIndex]
      const updatedItem = {
        ...existingitem,
        quantity: existingitem.quantity + 1
      }

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item, quantity: 1});
    }

    return {...state, items: updatedItems};
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {...state, items: updatedItems};
  }

  if (action.type === 'CLEAR_CART') {
    return  {...state, items: []};
  }
  return state;
}

export function CartContextProvider({children}) {
  const [cart, dispachCartAction] = useReducer(cartReducer, { items: [] });


  function addItem(item) {
    dispachCartAction({type: 'ADD_ITEM', item});
  }
  
  function removeItem(id) {
    dispachCartAction({type: 'REMOVE_ITEM', id});
  }
  
  function clearCart(id) {
    dispachCartAction({type: 'CLEAR_CART'});
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }
  
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;