import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'
const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <h1 className='px-8 py-3 font-bold rounded-full text-white bg-cyan-600	 hover:opacity-70'>devExtreme React</h1>

                    </Link>
                    <div className="hidden font-bold lg:flex">
                        <Link to="/product" className="text-black hover:text-darkBlue">
                            Product
                        </Link>
                    </div>
                </div>
                {isLoggedIn() ?
                    (
                        <div className="hidden lg:flex items-center space-x-6 text-back">
                            <Link to="/login" className="hover:text-darkBlue">Welcome, {user?.userName}</Link>
                            <a
                                onClick={logout}
                                className="px-8 py-3 font-bold rounded text-white bg-cyan-600	 hover:opacity-70"
                            >
                                Logout
                            </a>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center space-x-6 text-back">
                            <Link to="/login" className="hover:text-darkBlue">Login</Link>
                            <Link
                                to="/register"
                                className="px-8 py-3 font-bold rounded text-white bg-cyan-600	 hover:opacity-70"
                            >
                                Signup
                            </Link>
                        </div>
                    )}

            </div>
        </nav>
    )
}

export default Navbar