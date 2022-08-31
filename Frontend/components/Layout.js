import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Layout({children}) {
  return (
    <>
      <div className="mx-80">
        <Header />
      </div>
      <div className="mx-96">
        <NavBar />
      </div>
      <div className="">{children}</div>
      <Footer/>
    </>
  )
}