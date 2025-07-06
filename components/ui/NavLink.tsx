import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>;

const NavLink = ({ children, className = "", ...props }: NavLinkProps) => {
    const { href, ...rest } = props;

    return (
        <Link
            href={href}
            {...rest}
            className={`py-2.5 px-4 text-center rounded-full duration-150 ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;