import NavBar from './components/NavBar/NavBar'

import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'

const App = () => {
  return (
    <>
      <NavBar />    

      <ItemListContainer greetings={'Bienvenido matero!'} />
      
    </>
  )
}

export default App