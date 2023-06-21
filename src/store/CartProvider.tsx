import { PropsWithChildren , useReducer } from "react";
import CartContext from "./cart-context";
//import { IMeal } from "../components/Meals/AvailableMeals";
import { OrderedMeal } from "../components/Cart/Cart";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

interface Iaction {
    item? : OrderedMeal;
    type: string;
    id?: string;
}

interface Istate {
    items: OrderedMeal[]
    totalAmount: number
}


const cartReducer = (state:Istate, action: Iaction) => {
    if (action.type === 'ADD' && typeof(action.item) != 'undefined') {
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)

        const existingCartItemsIndex = state.items.findIndex((item:OrderedMeal)=> item.id === action.item?.id)        

        const existingCartItem = state.items[existingCartItemsIndex]

        let updatedItemz:OrderedMeal[]

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount}

            updatedItemz = [...state.items]

            updatedItemz[existingCartItemsIndex] = updatedItem
        } else {
            updatedItemz = state.items.concat(action.item)
        }

        return {
            items: updatedItemz,
            totalAmount: updatedTotalAmount
        }
    }

        if (action.type === 'REMOVE' && typeof(action.id) != 'undefined') {
            const existingCartItemIndex = state.items.findIndex(
              (item:OrderedMeal) => item.id === action.id
            );
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;
            if (existingItem.amount === 1) {
              updatedItems = state.items.filter((item:OrderedMeal)=> item.id !== action.id);
            } else {
              const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
              updatedItems = [...state.items];
              updatedItems[existingCartItemIndex] = updatedItem;
            }
        
            return {
              items: updatedItems,
              totalAmount: updatedTotalAmount
            };
          }
     
    return defaultCartState
}


const CartProvider = (props: PropsWithChildren) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


    const addItemToCartHandler = (item:OrderedMeal) => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemsFromCartHandler = (id:string) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemsFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;