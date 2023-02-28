import {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddQuestionBank(props) {
  const [questionBankName, setName] = useState('');
  const [questionBankDescription, setDescription] = useState('');
  

  let navigate = useNavigate()

  const formSubmit = (e)=>{
    e.preventDefault();

    axios.post("http://localhost:4000/questionBank/createQuestionBank", {
      questionBankName,
      questionBankDescription
    }).then(data=>{
      props.rerender()
      props.hidePopup(false)
      
    })
  }

  return (
    <>
      <h1>Add Question Bank</h1>
      <form onSubmit={
        formSubmit
      }>
        <input
          autoFocus
          className="form-control form-control-lg mt-2"
          type="text"
          placeholder="Name"
          aria-label=".form-control-lg example"
          onChange={(e)=>{
            setName(e.target.value)
          }}
           />
        <input
         className="form-control form-control-lg mt-2"
         type="text"
         placeholder="Description"
         aria-label=".form-control-lg example"
         onChange={(e)=>{
          setDescription(e.target.value)
          console.log(e);
        }}
         />
        <button type='submit' className='btn btn-primary mt-3 w-25'> Add</button>
      </form>
      
    </>
  )
}
