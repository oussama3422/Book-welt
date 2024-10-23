import styled from "styled-components";
import Logo from "./Logo";
import Logout from "../features/authentication/logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
const StyledHeader = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      {/* <Logout /> */}
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
