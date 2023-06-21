import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
//import { IMeal } from '../Meals/AvailableMeals';

export interface OrderedMeal {
    id: string
    name: string
    amount: number
    price: number
}

interface CartProps {
    onClose: () => void
}

const Cart = (props: CartProps) => {
    const cartCtx = useContext(CartContext)

    const placeHolders:OrderedMeal[] = [...cartCtx.items]

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id:string) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item: OrderedMeal) => {
        cartCtx.addItem({...item, amount:1})
    }

    const cardItems = <ul className={classes['cart-items']}>
        {placeHolders.map((item) => <CartItem key={item.id} 
                                              name={item.name} 
                                              amount={item.amount} 
                                              price={item.price}
                                              onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                              onAdd={cartItemAddHandler.bind(null, item)}/>)}
        </ul>

    return (
        <Modal onClose={props.onClose}>
            <div>{cardItems}</div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;