import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './component/Home';
import Tutorial from './component/Tutorial';
import C from './component/tutorial/C/C';
import Java from './component/tutorial/Java';
import About from './component/About';
import Blog from './component/Blog';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* about */}
          <Route path="/about" element={<About />}></Route>
          {/* blog */}
          <Route path="/blog" element={<Blog />}></Route>
          {/* tutorial */}
          <Route path="/tutorial" element={< Tutorial />}></Route>
          <Route path="/tutorial/c" element={< C />}></Route>
          <Route path="/tutorial/java" element={< Java />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
