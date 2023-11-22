const Person=({person,text,handleRemove})=>
  <p>{person.name} {person.number} <button onClick={handleRemove}>{text}</button></p>


export default Person