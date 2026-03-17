import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary";
    children: React.ReactNode;
    font?: "manrope" | "quintessential";
    className?: string;
    onClick?: () => void;
}

const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 ",
    secondary: "bg-blue-600  border-white hover:bg-blue-500 text-white",
};

const fontStyles = {
    manrope: "text-font1",
    quintessential: "text-font2",
};

const Button: React.FC<ButtonProps> = ({
    variant,
    children,
    font = "manrope",
    className = "",
    onClick,
    ...props
}) => {
    const baseStyle = "px-2 py-1 md:px-3 md:py-2 rounded-md antialiased  font-semibold";

    return (
        <button
            className={`${baseStyle} ${fontStyles[font]} ${variantStyles[variant]} ${className}`}
            onClick={onClick} 
            {...props} 
        >
            {children}
        </button>
    );
};

export default Button;
