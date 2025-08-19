import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/programa.webp"
        alt="Logo Orquesta Sinfónica de Carabobo"
        {...props}
        width={50}
        height={22}
        priority
    />
)
export default Brand