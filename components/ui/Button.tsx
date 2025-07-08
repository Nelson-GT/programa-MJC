import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ children, className = '', ...props }: ButtonProps) => (
    <button
        role="button"
        {...props}
        className={`${className} px-4 py-2.5 font-medium text-sm text-center duration-150`}
    >
        {children}
        
    </button>
);

export default Button;