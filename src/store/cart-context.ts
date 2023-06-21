/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
//import { IMeal } from '../components/Meals/AvailableMeals';
import { OrderedMeal } from '../components/Cart/Cart';

export interface ICartContext {
    items: OrderedMeal[]
    totalAmount: number
    addItem: (item: OrderedMeal) => void
    removeItem: (id: string) => void
}

// interface Itemparams extends IMeal {
//     amount?: number
// }

const CartContext= React.createContext<ICartContext>({
    items: [],
    totalAmount: 0,
    addItem: (_item:OrderedMeal) => undefined,
    removeItem: (_id: string) => undefined
})

export default CartContext;