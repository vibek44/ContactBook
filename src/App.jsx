import { useState } from 'react'
import ContactForm from './components/ContactForm'
import Person from './components/Person'

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleName=(e)=>setNewName(e.target.value)
  const handleNumber=(e)=>setNewNumber(e.target.value)
  
  const handleSubmit=(e)=>{
    console.log(e.target);
  }



  return (
    <>
      <h2>ContactBook</h2>
      <ContactForm name={newName}  number={newNumber} 
        handleName={handleName} handleNumber={handleNumber}
        handleSubmit={handleSubmit}/>
        <h2>Numbers</h2>
      { persons.map(person=><Person key={person.id} person={person}/>)
      }
    </>  
  )
}

export default App
