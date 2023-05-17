
import Home from "./components/Home";
import Feedback from "./components/Feedback";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import App1 from "./components/App1";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";


function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/vidguk" element={<Feedback/>}/>
        <Route path="/nashiroboty" element={<Carousel/>}/>
        <Route path="/tovar" element={<App1/>}/>
        <Route path="/cont" element={<Footer/>}/>
        
    </Route>
   </Routes>
   </>
  );
}

export default App;