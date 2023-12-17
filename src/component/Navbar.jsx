import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Navbar = () => {
    const axiosUrl = UseAxios();
    const { user, logOut } = useContext(AuthContext);
    const email = user?.email;
    

    const { data: order = [], refetch } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosUrl.get("/order");
            return res.data;
        },
    });

    const { data: users = [], } = useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            const res = await axiosUrl.get(`/user?email=${email}`);
            return res.data;
        },
    });
   

    const handleSignOut = () => {
        logOut()
            .then(() => console.log("user logOut "))
            .catch((error) => console.log(error));
    };
    const closeDrawer = () => {
        // Get the checkbox and set its checked property to false
        const drawerCheckbox = document.getElementById("my-drawer-4");
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };

    refetch()
    return (
        <div>
            <div className="navbar  bg-white">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Grocery</a>
                </div>
                <div className="flex-none">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/healthy">Product</NavLink></li>
                            {
                                users[0]?.role ==="Admin"? <li><NavLink to="/addProduct">AddProduct</NavLink></li> : ""
                            }
                            {
                                users[0]?.role ==="Admin"? <li><NavLink to="/order">Order</NavLink></li> : ""
                            }
                            {
                                users[0]?.role ==="Admin"?"": <li><NavLink to="/myorder">My Order</NavLink></li> 
                            }
                            {
                                user ? "" : <li><NavLink to="/signIn">SigIn</NavLink></li>
                            }
                        </ul>
                    </div>
                    <div className="drawer drawer-start">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200">
                                <li><NavLink to="/" onClick={closeDrawer}>Home</NavLink></li>
                                <li><NavLink to="/healthy" onClick={closeDrawer}>Product</NavLink></li>
                                {
                                    users[0]?.role === "Admin" ? <li><NavLink to="/addProduct" onClick={closeDrawer}>AddProduct</NavLink></li> : ""
                                }
                                {
                                    users[0]?.role === "Admin" ? <li><NavLink to="/order" onClick={closeDrawer}>Order</NavLink></li> : ""
                                }
                                {
                                    user ? "" : <li><NavLink to="/signIn" onClick={closeDrawer}>SigIn</NavLink></li>
                                }
                            </ul>
                        </div>
                    </div>
                    {
                        users[0]?.role === "Admin" ? "" : <div className="dropdown dropdown-end">
                            <NavLink to="/OrderConfirm">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">{order.length}</span>
                                    </div>
                                </div>
                            </NavLink>

                        </div>
                    }

                    <div className="flex">
                        {
                            user ? <button onClick={handleSignOut} className="btn btn-ghost">Logout</button> : ""
                        }
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;