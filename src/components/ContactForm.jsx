
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
                                <input  type="number" 
                                    value={number} 
                                    onChange={handleNumber} />
                                </div>
                              
                                <button type="submit"  >add</button>
                               
                              </fieldset>
                          </form>



export default ContactForm;