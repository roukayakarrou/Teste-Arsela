import "./Home.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { Header, Nav, Form, Toolbox, Footer } from "@components";

function Home() {
  return (
    <>
      <Header/>
      <div className="home-body">
        <DndProvider backend={HTML5Backend}>
          <Nav/>
          <Form/>
          <Toolbox/>
        </DndProvider>
      </div>
      <Footer/>
    </>
  )
}

export default Home;