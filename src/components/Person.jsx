const Person=({person,text1,text2,handleRemove,handleEdit})=>{
    const buttonStyle = {
       marginRight:5 
      }
return(<tr>
    <td>{person.name} </td>
    <td>{person.number}</td>
    <td ><button style={buttonStyle} type="button" onClick={handleRemove}>{text1}</button>
        <button type="button" onClick={handleEdit}>{text2}</button>
    </td>

   
   </tr>)
}
   

export default Person