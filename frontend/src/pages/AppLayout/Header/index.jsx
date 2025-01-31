import { useApp } from "./../../../contexts/AppContext";
import Button from "./components/Button";
import Greeting from "./components/Greeting";
import { HeaderNav, NavContainer } from "./components/Layouts";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";

function Header() {
  const { isMobile } = useApp();

  return (
    <HeaderNav>
      <Greeting />
      <NavContainer>
        <Button />
        {!isMobile && <Search />}
        <UserProfile />
      </NavContainer>
    </HeaderNav>
  );
}

export default Header;
