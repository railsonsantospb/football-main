import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #333;
`;

export const NavBar = styled.nav`
max-width: 1200px;
height: 60px;
margin: 0 auto;
padding: 0 60px;

display: flex;
align-items: center;
justify-content: space-between;
`;

export const Brand = styled.div`

`;

export const MenuList = styled.ul`
list-style: none;
`;

export const MenuItem = styled.li`
display: inline;
margin-left: 20px;

a {
  text-decoration: none;
  color: #FFF;
}
`;
