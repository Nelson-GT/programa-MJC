import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>;

const NavLink = ({ children, className = "", ...props }: NavLinkProps) => {
    const { href, ...anchorProps } = props;

    return (
        <Link href={href} legacyBehavior>
        <a
            {...anchorProps}
            className={`py-2.5 px-4 text-center rounded-full duration-150 ${className}`}
        >
            {children}
        </a>
        </Link>
    );
};

export default NavLink;