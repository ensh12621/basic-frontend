
import { ChangeEvent } from "react";


interface UnderlineInputProps{
    type?: string;
    value?: string;
    id?: string;
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void;
    placeholder? : string;
}

export function UnderlineInput({type, id, value, onChange, placeholder} : UnderlineInputProps){
    return (
        <Input1 
            type={type}
            value={value}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            extraCss="border-b border-gray-600 px-2 py-1"

        />
    );
}



interface Input1Props{
    type?: string;
    value?: string;
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void;
    extraCss? : string;
    id?:string;
    placeholder? : string;
}



export function Input1({type = "text", value, onChange, extraCss, id, placeholder} : Input1Props){
    return <input 
                type={type} 
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                className={`outline-none ${extraCss}`}
                  />
}