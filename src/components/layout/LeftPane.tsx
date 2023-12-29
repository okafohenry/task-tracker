import Image from "next/image";
import { NavLink } from "react-router-dom";
import profileIcon from "../../assets/icons/profileIcon.svg";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import logoutIconOn from "../../assets/icons/on.logout-icon.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/users.services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/userReducer";

const navs = [
    {
        icon: 'task-icon.svg',
        name: 'All Tasks',
        route: '/tasks'
    },
    {
        icon: 'edit-icon.svg',
        name: 'Create',
        route: '/home'
    },
]

function LeftPane() {
    const route = useRouter().route;
    const [active, setActive] = useState<any>(null);
    const user = useSelector((state: any) => state.user.userInfo);
    const [logoutActive, setLogoutActive] = useState(false);
    const userService = new UserService();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        userService.Logout()
        .then((res) => {
            if(res?.error){
                toast.error(res?.error)
            }else {
                toast.success('Logout successful!');
                localStorage.removeItem('tracka-token');
                dispatch(logout());
                router.push('/');
            }
        })
    }

    return (
        <div>
            <div></div>
            <div className="mt-[5rem]">
                { navs.map((nav, index) => {
                    const isSelected = route.includes(nav.route);
                    return (
                        <Link href={nav.route} key={index}>
                            <div 
                            onMouseOver={() => setActive(nav)}
                            onMouseOut={() => setActive(null)}
                            className={
                                !isSelected
                                    ? "flex flex-row gap-x-5 my-3 w-[100%] text-black items-center md:justify-start justify-center  cursor-pointer hover:bg-black hover:text-white md:py-4 p-2 md:px-5 "
                                    : "flex flex-row gap-x-5 my-3 w-[100%]  text-white bg-black items-center md:justify-start justify-center cursor-pointer  md:py-4 p-2 md:px-5 hover:bg-black hover:text-white"
                                }>
                                <Image src={
                                     (isSelected || active?.route === nav.route)
                                     ? require(`../../assets/icons/on.${nav.icon}`)
                                     : require(`../../assets/icons/${nav.icon}`)
                                    } alt="edit-icon" height={22} width={22} />
                                <p className={
                                    isSelected
                                    ? "text-[16px] tracking-wide font-light hidden md:block"
                                    : "text-[16px] tracking-wide font-light hidden md:block"
                                }>{nav.name}</p>
                            </div> 
                        </Link>
                    )
                })}
                {/* <Link href="">
                    <div className="flex gap-x-4">
                        <Image src={editIcon} alt="edit-icon" height={25} width={25}  />
                        <p>All Tasks</p>
                    </div> 
                </Link> */}
            </div>
            <button 
                onMouseOver={() => setLogoutActive(true)}
                onMouseOut={() => setLogoutActive(false)}
                onClick={handleLogout}
                className="mt-[3rem] flex flex-row gap-x-5 w-[100%] text-black items-center md:justify-start justify-center  cursor-pointer hover:bg-black hover:text-white md:py-4 p-2 md:px-5">
                    <Image src={logoutActive ? logoutIconOn  : logoutIcon} alt="log-out" height={22} width={22} />
                    <p className="lg:block hidden">Logout</p>
            </button>


            <div className="mt-[15rem]"> 
                <div className="mt-[5rem] lg:h-[80px] lg:w-[80px] h-[30px] w-[30px] mx-auto rounded-full  flex items-center justify-center">
                    <Image src={profileIcon} alt="user" className="" />
                </div>
                <p className="text-black font-semibold text-[16px] text-center lg:block hidden">{user?.name}</p>
                <p className="text-black font-extralight text-[12px] text-center lg:block hidden">{user?.email}</p>       
            </div>
        </div>
    )
}

export default LeftPane;