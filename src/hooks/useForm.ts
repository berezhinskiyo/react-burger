import { ChangeEvent, useState } from 'react';

export default function useForm<T>(inputValues: T) {
    const [form, setForm] = useState<T>(inputValues);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm({ ...form, [name]: value });
    };
    return { form, onChange, setForm };
}