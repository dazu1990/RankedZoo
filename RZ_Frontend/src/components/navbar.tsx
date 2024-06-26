import React, { useState } from 'react';

interface NavItem {
    name: string;
    link: string;
    callback?: () => void;
}
interface NavbarProps {
    navItems: NavItem[];
}

export const Navbar = ({navItems}: NavbarProps) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);

    const navButtons = navItems.map((item: NavItem, index: number) => {
        return (
            // flex-no-wrap fixed top-0 flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4
            <div className="flex items-center flex-shrink-0 text-white mr-6" key={`${index}_navbarItem`}>
                <a className="font-semibold text-xl tracking-tight" href={item.link}>{item.name}</a>
            </div>
        )
    })

    return (
        <div className='fixed flex items-center justify-between flex-wrap bg-teal-500 p-6 w-full z-3'>
            <nav className="flex items-center justify-between flex-wrap ">
                {navButtons}
            </nav>
        </div>
    )
};