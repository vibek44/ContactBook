const ContactForm=({handleName,handleNumber,handleSubmit,name,number})=><form onSubmit={handleSubmit}>
  <div>
    <label>Name</label><input type="text" value={name} onChange={handleName}/><br/>
    <label>Tel.no</label><input type="number" value={number} onChange={handleNumber}/>
  </div>
  <div>
    <button type="submit">Add</button>
  </div>

</form>


export default ContactForm;