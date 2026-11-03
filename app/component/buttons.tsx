
interface ButtonProps {
    value: string;
    disabled?: boolean;
    onClick?: () => void;

}

export function BlueButton({ value, disabled = false, onClick }: ButtonProps) {



    return (
        <Button1
            disabled={disabled}
            onClick={onClick}
            value={value}
            extraCss="bg-blue-500 text-white disabled:bg-blue-300"
        />
    );
}

export function GreenButton({ value, disabled, onClick }: ButtonProps) {

    return (
        <Button1
            disabled={disabled}
            onClick={onClick}
            value={value}
            extraCss="bg-green-500 text-white disabled:bg-green-300"
        />
    );
}

export function RedButton({ value, disabled, onClick }: ButtonProps) {

    return (
        <Button1
            disabled={disabled}
            onClick={onClick}
            value={value}
            extraCss="bg-red-500 text-white disabled:bg-red-300"
        />
    );
}

export function BlackButton({ value, disabled, onClick }: ButtonProps) {

    return (
        <Button1
            disabled={disabled}
            onClick={onClick}
            value={value}
            extraCss="bg-black text-white disabled:bg-black-300"
        />
    );
}


interface Button1Props {
    value: string;
    disabled?: boolean;
    onClick?: () => void;
    extraCss?: string;
}

function Button1({ value, disabled, onClick, extraCss }: Button1Props) {
    return (
        <button
            className={`py-2 px-3 rounded-md shadow-md cursor-pointer  ${extraCss}`}
            disabled={disabled}
            onClick={onClick}
        >
            {value}
        </button>
    );
}