import classes from './Input.module.css';
import React from 'react';

interface IInput {
    id: string
    type: string
    min: string
    max: string
    step: string
    defaultValue: string
}

// type RefProps = {
//     ref: React.RefObject<HTMLInputElement>
// }

type InputProps = {
    label: string
    input: IInput
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    )
})

export default Input;