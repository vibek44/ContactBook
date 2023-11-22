import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Person from './components/Person'
import ContactService from './services/Communication'
import Notification from './components/Notification'

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] =useState('')
  const [message, setMessage]=useState({successmsg:null,errormsg:null})

  const peopleToShow =search 
   ? persons.filter(person=>person.name.toLowerCase().includes(search.toLowerCase()))
   :persons
  
  useEffect(()=>{
    ContactService
    .getAll()
    .then(initialPersons=>setPersons(initialPersons))
  }
  ,[])

  
  const handleName=(e)=>setNewName(e.target.value)
  const handleNumber=(e)=>setNewNumber(e.target.value)
  const handleSearch=(e)=>setSearch(e.target.value)
  
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
        .then(resData=>{
          
          setPersons(persons.concat(resData))
          setNewName('')
          setNewNumber('')
          setMessage({...message,successmsg:`Added ${resData.name}`})
          setTimeout(() => {
            setMessage({...message,successmsg:null})
          }, 5000)
        })
          
      }
    }
  }

  const handleRemove=(id)=>{
    
    const removePerson=peopleToShow.find(person=>person.id===id)
    confirm(`Delete ${removePerson.name}`)
    ContactService
    .remove(id)
    .then(()=>setPersons(
        persons.filter(person=>person.id!==id))
    )
    .catch(err=>{
      setPersons(persons.filter(person=>person.id!==id))
      setMessage({...message,errormsg:`Information of ${removePerson.name} is already removed`})
      setTimeout(()=>setMessage({...message,errormsg:null}),5000)
    })
     
  }
 
  return (
    <>
      <h2>ContactBook</h2>
      {(message.errormsg||message.successmsg) && <Notification message={message} />}
      <label>Search:</label> <input type='text' search={search} onChange={handleSearch}/>
      <h3>Add new Contact</h3>
      <ContactForm name={newName}  number={newNumber} 
        handleName={handleName} handleNumber={handleNumber}
        handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      { peopleToShow.map( person=><Person key={person.id} person={person}
          handleRemove={()=>handleRemove(person.id)} text="delete"/> ) 
      }
    </>  
  )
}

export default App
