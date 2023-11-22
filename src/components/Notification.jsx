const Notification=({message})=>{
  if(message.errormsg===null && message.successmsg===null){
    return null
  }else if(message.successmsg){
    return<p>{message.successmsg}</p>
  }else{
    return<p>{message.errormsg}</p>
  }
}

export default Notification;
