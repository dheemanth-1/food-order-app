import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import {useContext, useEffect, useState} from 'react';
import CartContext from "../../store/cart-context";
import { OrderedMeal } from "../Cart/Cart";

interface HeaderCartButton {
    onClick?: () => void
}

const HeaderCartButton = (props: HeaderCartButton) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
  
    const { items } = cartCtx;
  
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item:OrderedMeal)=>{return curNumber + item.amount}, 0)

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span >Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton 