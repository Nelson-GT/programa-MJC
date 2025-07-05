import { PropsWithChildren, HTMLAttributes } from 'react';

type DarkWrapperProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const DarkWrapper = ({ children, className = '', ...props }: DarkWrapperProps) => (
    <section
        {...props}
        className={`relative overflow-hidden bg-red-950 py-20 my-16 ${className}`}
    >
        <div
        className="absolute inset-0 max-w-xl mx-auto h-72 blur-[118px]"
        style={{
            background:
            'linear-gradient(152.92deg, #CB9318 4.54%, #CB9318 34.2%, #CB9318 77.55%)',
        }}
        ></div>
        <div className="relative">{children}</div>
    </section>
    );

export default DarkWrapper;