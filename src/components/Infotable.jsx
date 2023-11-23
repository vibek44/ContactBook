import Person from "./Person"

const Infotable=({peoples,handleRemove})=><table>
<caption>Phone book</caption>
<tbody>
 <tr>
   <th>Name</th>
   <th>Tel.no</th>
   <th>Action</th>
 </tr> 
 { peoples.map( person=><Person key={person.id} person={person}
     handleRemove={()=>handleRemove(person.id)} text="delete"/> ) 
 }
</tbody>
</table>

export default Infotable