import { ChangeEvent, useState } from 'react';

export default function useForm(inputValues : object) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return [values, handleChange, setValues];
}