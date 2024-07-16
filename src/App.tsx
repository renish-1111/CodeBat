import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './component/Home';
import Tutorial from './component/Tutorial';
import C from './tutorial/C/C';
import Java from './tutorial/Java';
import About from './component/About';
import Blog from './component/Blog';
import NodeJs from './Blog/NodeJs';


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
          <Route path="/blog/nodejs" element={<NodeJs />}></Route>
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
