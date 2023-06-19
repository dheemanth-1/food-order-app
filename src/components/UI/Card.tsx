import classes from './Card.module.css';
import {PropsWithChildren} from 'react'


const Card = (props: PropsWithChildren) => {
    return <div className={classes.card}>{props.children}</div>
}

export default Card;