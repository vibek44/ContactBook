import axios from "axios";
const baseurl=`http://localhost:3001/persons`

const getAll=()=>{
  const request=axios.get(baseurl)
  return request.then(res=>res.data)
}

const create=(createdObject)=>{
  const request= axios.post(baseurl,createdObject)
  return request.then(res=>res.data)
}

const update=(id,updatedObject)=>{
  const request= axios.put(`${baseurl}/${id}`,updatedObject)
  return request.then(res=>res.data)
}

const remove=(id)=>{
  const request= axios.delete(`${baseurl}/${id}`)
  return request.then(res=>res.data)
}


export default {
  getAll,
  create,
  update,
  remove
}