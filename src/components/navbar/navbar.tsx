"use client"

import styled from "styled-components";
import { useState } from "react";



    type NavVariant = 'default' |  'login';

    interface Props {
        variant?:NavVariant;
    }

    export default function Navbar({ variant = 'default'}:Props){
        const [activeMenu, setActiveMenu ] = useState<string>('');

        const bgColor = {
            default : 'var(--white)',
            login : 'var(--white)',

        }

    

        const menuItems = {
            default : ['알바 목록', '알바 토크', '내 알바폼'],
            login : ['사장님 전용', '지원자 전용']
        }

        const hamburgerMenu = {
            default : '/images/menu.png',
            login : 'none',
        }

        const Logo = styled.img `
            height: 40px;
            cursor : pointer;
            margin-right: 48px;
        `;

        const NavbarWrapper = styled.nav<{$bg: string}>`
            display: flex;
            align-items: center;
            padding: 24px 220px;
            background-color: ${(props)=>props.$bg};      
        `;

        const MenuList = styled.ul`
            display: flex;
            gap: 24px;
        
        `;

        const MenuItem = styled.li<{ $isActive?: boolean }>`
            font-size: 20px;
            color: ${(props) => (props.$isActive ? 'var( --primary-orange300)' : 'var( --gray300)')};
            cursor: pointer;
            &:hover{
                color: var(--primary-orange300);
                }
        `;

        const Hamburger = styled.img`
            width: 36px;
            height: 36px;
            cursor: pointer;
        
        `



    return(
        <div>
            <NavbarWrapper $bg={bgColor[variant]}>
                <Logo src='/logo/logo.png' alt="logo" />
                    <MenuList>
                        {menuItems[variant].map((item)=>(
                            <MenuItem 
                                key={item}
                                $isActive={item === activeMenu}
                                onClick={()=>setActiveMenu(item)}
                                >
                                    item
                                </MenuItem>
                        ))}
                    </MenuList>
                        {hamburgerMenu[variant] !== 'none' && (
                            <Hamburger src={hamburgerMenu[variant]} alt="menu icon"/>
                        )}
                
            </NavbarWrapper>

        </div>
    );
}