import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdCloudUpload, MdSupervisorAccount } from 'react-icons/md';

import { HeaderContainer, NavBar, Brand, MenuList, MenuItem, } from './styles';

export default function Header() {
  return (
    <HeaderContainer>
      <NavBar>
        <Brand>Stream</Brand>
        <MenuList>
          <MenuItem>
            <Link to="/">
              <MdHome size={22} color="white" />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/upload">
              <MdCloudUpload size={22} color="white" />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/account">
              <MdSupervisorAccount size={22} color="white" />
            </Link>
          </MenuItem>
        </MenuList>
      </NavBar>
    </HeaderContainer>
  );
}
