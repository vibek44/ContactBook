const Person=({person,text,handleRemove})=><div>
  <p>{person.name} {person.number} <button onClick={handleRemove}>{text}</button></p>
</div>

export default Person