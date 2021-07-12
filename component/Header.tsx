import React, { useState, useEffect } from "react";
import logo from "public/logo.png";
type Props = {};

import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const Header = () => {
    return (
        <div className="Header">
            <Link href={"/"}>
                <div className="logo">
                    <img src={logo.src} />
                </div>
            </Link>
            <div className="menu_list">
                <span className="menu_btn">
                    <Link href={"/category"}>
                        <AiOutlineMenu />
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Header;
