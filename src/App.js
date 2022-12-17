import './App.css';
//importamos nuestros componentes
import Create from './components/Create';
import Edit from './components/Edit';
import Principal from './components/Principal';


//importamos el router
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">    
     <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Principal /> } />
        <Route path='/create' element={ <Create /> } />
        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
