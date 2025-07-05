import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/sinfonica2.jpg"
        alt="Logo Orquesta Sinfónica de Carabobo"
        {...props}
        width={86}
        height={48}
        priority
    />
)
export default Brand