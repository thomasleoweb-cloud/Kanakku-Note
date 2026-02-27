import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Content from "../components/Content";

const Home = () => {
  return (
    <div className="MainLayout grid grid-cols-6 grid-rows-10 min-h-screen">
      <div className="col-span-6 row-span-1 bg-blue-400">
        <Header  />
      </div>
      <div className="col-span-1 row-span-9 bg-blue-400">
        <Menu  />
      </div>
      <div className="col-span-5 row-span-9">
        <Content  />
      </div>
      <div className="col-span-6 row-span-1">
        <Footer  />
      </div>
    </div>
  );
};

export default Home;
