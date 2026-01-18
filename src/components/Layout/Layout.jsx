import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
function Layout() {

  return (
    <>
      <section className="flex flex-col min-h-screen">
        <Navbar/>
        <section className="container mx-auto py-10 grow">
          <Outlet></Outlet>
        </section>
        <Footer/>
      </section>
    </>
  );
}

export default Layout;
