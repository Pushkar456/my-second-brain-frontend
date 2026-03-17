interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | null;
    inputId?: string | null;
}

const Input: React.FC<InputProps> = ({ 
    label = null,
    inputId = null,
    ...props 
}) => {
    if (label && !inputId) {
        console.error("If 'label' is provided, 'id' must also be provided.");
    }

    return (
        <>
            {label && inputId && (
                <label htmlFor={inputId} className='text-text text-bg-black text-[1rem] lg:text-[1.2rem] h-[2.7rem] font-font1 font-medium tracking-wider'>
                    {label}
                </label>
            )}
            <input
                className="bg-blue-100 placeholder-border text-black text-[0.8rem] lg:text-[1rem] h-[2.5rem] px-3 w-full"
                id={inputId || undefined} 
                {...props}
            />
        </>
    );
};

export default Input;
