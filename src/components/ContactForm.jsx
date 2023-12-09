
const ContactForm=({handleName,handleNumber,handleSubmit,name,number})=> <form  className="form-container" onSubmit={handleSubmit}>
    <fieldset> 
        <legend>Add contact</legend>
        <div>
            Name: 
            <input   value={name} 
            onChange={handleName} />
        </div>
        <div>
            Number: 
            <input type="tel" 
                value={number} 
                onChange={handleNumber} 
                pattern="[0-9]{2,3}-[0-9]{7,8}"/>
        </div>

        <button type="submit"  >add</button>
    
    </fieldset>
</form>



export default ContactForm;