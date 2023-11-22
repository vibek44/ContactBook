import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Person from './components/Person'
import ContactService from './services/Communication'

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(()=>{
    ContactService
    .getAll()
    .then(initialPersons=>setPersons(initialPersons))
  }
  ,[])


  const handleName=(e)=>setNewName(e.target.value)
  const handleNumber=(e)=>setNewNumber(e.target.value)
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    const name=newName.trim()
    const number=newNumber.trim()
    if(name && number){
      const result=persons.find(person=>person.name.toLowerCase()===name.toLowerCase())  
      if(result){
        confirm(`${name} is alreay added to phonebook ,replace old number with new`)
        const updatedPerson={...result,number}
        ContactService
        .update(result.id,updatedPerson)
        .then(resData=>setPersons(persons.map(person=>person.id!==resData.id ?person :resData)))
      }else{
        const createdPerson={name, number}
        ContactService
        .create(createdPerson)
        .then(resData=>setPersons(persons.concat(resData)))
      }
    }
  }

  const handleRemove=(id)=>{
     ContactService
     .remove(id)
     .then(resData=>setPersons(
        persons.filter(person=>person.id!==id))
      )
  }
 
  return (
    <>
      <h2>ContactBook</h2>
      <ContactForm name={newName}  number={newNumber} 
        handleName={handleName} handleNumber={handleNumber}
        handleSubmit={handleSubmit}/>
        <h2>Numbers</h2>
      { persons.map( person=><Person key={person.id} person={person}
        handleRemove={()=>handleRemove(person.id)} text="delete"/> ) 
      }
    </>  
  )
}

export default App
