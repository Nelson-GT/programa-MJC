import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/logo.png"
        alt="Logo Orquesta Sinfónica de Carabobo"
        {...props}
        width={66}
        height={38}
        priority
    />
)
export default Brand