import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Infotable from './components/Infotable'
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
    .then(initialPersons=>{
      setPersons(initialPersons)})
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
        .catch(err=>{
          setMessage({...message,errormsg:err.response.data.error})
          setTimeout(()=>{
            setMessage({...message,errormsg:null})
          },5000)
        })
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
        .catch(err=>{
          console.log(err);
          setMessage({...message,errormsg:err.response.data.error})
          setTimeout(()=>{
            setMessage({...message,errormsg:null})
          },5000)
        }) 
      }
    }else{
      setMessage({...message,errormsg:'Name or number missing'})
      setTimeout(()=>{
        setMessage({...message,errormsg:null})
      },3000)
    }
  }

  const handleEdit=(id)=>{
   const result=peopleToShow.find(person=>person.id.toLowerCase().localeCompare(id.toLowerCase())===0)
   setNewName(result.name)
   setNewNumber(result.number)
  }

  const handleRemove=(id)=>{
    console.log(typeof id );
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
    <div className='main-container'>
      {(message.errormsg||message.successmsg) && <Notification message={message} />}
      <label>Search: <input type='text' search={search} onChange={handleSearch}/></label>
      <h3>Add new Contact</h3>
      <ContactForm name={newName}  number={newNumber} 
        handleName={handleName} handleNumber={handleNumber}
        handleSubmit={handleSubmit}/>
      {
        (peopleToShow.length > 0) 
        ? <Infotable  handleRemove={handleRemove} handleEdit={handleEdit} peoples={peopleToShow}/>
        :<p>No Contacts Found</p>
      }
      
      
    </div>  
  )
}

export default App
