const Person=({person,text,handleRemove})=><tr>
    <td>{person.name} </td>
    <td>{person.number}</td>
    <td><button type="button" onClick={handleRemove}>{text}</button></td>
   
   </tr>
   

export default Person