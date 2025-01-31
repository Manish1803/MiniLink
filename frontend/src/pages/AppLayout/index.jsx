import { Outlet } from "react-router";

import Section from "./ui/Section";
import Main from "./ui/Main";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <Main>
      <Sidebar />
      <Section>
        <Header />
        <Outlet />
      </Section>
    </Main>
  );
}

export default AppLayout;
