import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    return (
        <header
            className="flex flex-row justify-between items-center p-4 border-b bg-white"
            style={{ borderColor: 'rgba(0, 0, 0, 0.60)' }}
        >
            <div className="flex">
                <Link>
                    <h2 className="text-center font-roboto-slab text-[#271E69] text-4xl font-medium leading-normal">
                        GYM BUDDY
                    </h2>
                </Link>
            </div>

            <ul className="flex flex-row space-x-4 items-center">
                <Link to='/' className="flex">
                    <li className="text-center font-roboto text-black text-xl font-normal leading-norma
                        hover:bg-[#E6E6E6] hover:text-[#3B2C7A]
                        px-4 py-2 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg
                        active:bg-[#D0D0D0] active:scale-95">
                        DASHBOARD
                    </li>
                </Link>
                <Link to='/signin' className="flex">
                    <li className="text-center font-roboto-condensed text-black text-xl font-normal leading-norma
                        hover:bg-[#E6E6E6] hover:text-[#3B2C7A]
                        px-4 py-2 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg
                        active:bg-[#D0D0D0] active:scale-95">
                        SIGN IN
                    </li>
                </Link>
                <Link to='/about' className="flex">
                    <li className="text-center font-roboto-flex text-black text-xl font-normal leading-normal
                        hover:bg-[#E6E6E6] hover:text-[#3B2C7A]
                        px-4 py-2 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg
                        active:bg-[#D0D0D0] active:scale-95">
                        SUPPORT
                    </li>
                </Link>
                <Link to='/profile' className="flex">
                    <FaUserCircle
                        className="text-4xl text-[#271E69]
                            hover:bg-[#E6E6E6]
                            hover:text-[#3B2C7A]
                            hover:scale-110
                            hover:shadow-lg
                            transition-transform
                            duration-300
                            ease-in-out
                            active:text-[#1A1A1A]
                            active:scale-95
                            cursor-pointer
                            p-2
                            rounded-full"
                    />
                </Link>
            </ul>
        </header>
    )
}

export default Header;
