import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import {useRef, useState} from 'react';

interface MealItemFormProps {
    onAddToCart: (amount:number) => void
    id: string
}

const MealItemForm = (props: MealItemFormProps) => {
    const [amountIsValid, setAmounIsValid] = useState(true)

    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event:React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        
    
        
        const enteredAmount = amountInputRef.current?.value as string
        const enteredAmountNumber: number = +enteredAmount
    
    if (typeof(enteredAmount) !== 'undefined') {
        console.log(enteredAmountNumber)
        if (enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 0 ||
            enteredAmountNumber > 5) {
                setAmounIsValid(false)
                return;
        }
    }
        props.onAddToCart(enteredAmountNumber)
    }


 return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input label='Amount' input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} ref={amountInputRef}/>
        <button type='submit'>+ Add</button>
        {!amountIsValid && <p>Please Enter a valid amount(1 to 5).</p>}
    </form>
 )
}

export default MealItemForm