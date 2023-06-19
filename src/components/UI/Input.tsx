import classes from './Input.module.css';

interface IInput {
    id: string
    type: string
    min: string
    max: string
    step: string
    defaultValue: string
}

type InputProps = {
    label: string
    input: IInput
}
const Input = (props: InputProps) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input}/>
        </div>
    )
}

export default Input;