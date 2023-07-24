import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "./App.css"
import TheLayout from "./pages/Layout";
import Login from './pages/Login';
import Home from './pages/Home';
import Timetable from './pages/Timetable';
import Picture from './pages/Picture';
import Roles from './pages/Roles';
import Feedback from './pages/Feedback';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <TheLayout/> */}
        <Routes>
          <Route path='/' element={
            <TheLayout/>
          }>
            <Route index element={<Home/>}></Route>
            <Route path='timetable' element={<Timetable/>}></Route>
            <Route path='feedback' element={<Feedback/>}></Route>
            <Route path='roles' element={<Roles/>}></Route>
            <Route path='picture' element={<Picture/>}></Route>
          </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='*' element={<Page404/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
