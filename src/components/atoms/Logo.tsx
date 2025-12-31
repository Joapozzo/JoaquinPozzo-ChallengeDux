import Image from "next/image";

interface LogoProps { 
    width: number;
    height: number;
    src: string;
    alt: string;
}

const Logo = ({ width = 10, height = 10, src = "/logo.png", alt = "Logo Dux" }: LogoProps) => { 
    return (
        <Image 
            src={src} 
            alt={alt} 
            width={width} 
            height={height} 
            loading="eager"
            style={{ width: "auto", height: "auto" }}
            className="filter brightness-0 invert" 
        />
    )
}

export default Logo;