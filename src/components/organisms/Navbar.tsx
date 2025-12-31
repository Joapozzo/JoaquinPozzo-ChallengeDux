import Logo from "../atoms/Logo";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 fixed top-0 w-full z-11">
            <Logo width={100} height={100} src="/logo.png" alt="Logo Dux" />
            <i className="pi pi-cog text-white text-lg"></i>
        </nav>
    )
}

export default Navbar;