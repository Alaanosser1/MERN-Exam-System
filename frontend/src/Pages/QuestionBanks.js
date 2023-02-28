import {React, useEffect, useState, useRef} from 'react'
import { Link} from 'react-router-dom';
import axios from 'axios';
import Popup from '../components/Popup';
import AddQuestionBank from '../components/AddQuestionBank';
import Swal from 'sweetalert2';

export default function QuestionBanks() {
  const [questionBanks, setQuestionBanks]= useState([])
  const [buttonPopup, setButtonPopup]= useState(false)
  const refOne = useRef(null)
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    getQuestionBanks()
  }, [])

  const handleClickOutside = (e)=>{
      if(!refOne.current.contains(e.target)){
        console.log("outside");
        setButtonPopup(false)
      }else{
        console.log("inside");
      }
  }

  const getQuestionBanks = ()=>{
    axios.get('http://localhost:4000/questionBank/getQuestionBanks')
    .then((res)=> {
      console.log(res.data);
      setQuestionBanks(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
   const deleteQuestionBank = (questionBank) =>{
    Swal.fire({
      title: `Are You Sure You Want to Delete ${questionBank.question_bank_name}?`,
      showCancelButton: true
    }).then((res=>{
      if(res.isConfirmed){
        axios.delete(`http://localhost:4000/questionBank/deleteQuestionBank`, {
          params: {
            questionBankId : questionBank.question_bank_id
          }
        }).then((res) =>{
          console.log(res.data)
          getQuestionBanks()
        })
      }
    }))

  }
  return (
    <>
  
    <div className='container m-5' onClick={()=>{
      console.log('clicked')
    }}>
        <div ref = {refOne}>
        <Popup trigger  = {buttonPopup} setTrigger = {setButtonPopup}>
          <AddQuestionBank rerender = {getQuestionBanks} hidePopup = {setButtonPopup}></AddQuestionBank>
        </Popup>
    </div>
      <div className = 'row'>
      <div className = 'col-9'>
      <h1 className = 'mt-5'>Question Banks</h1>
      </div>
        <div className='col-3'>
          <button onClick={()=>{
              setButtonPopup(true)
           } } className='btn btn-success mt-5'>Add New Question Bank</button>
        </div>
      </div>



    <table className="table mt-5 ">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">description</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(questionBanks).map((bank)=>{
      return(
        
    <tr key = {bank[1].question_bank_id}>
      <th scope="row">{bank[1].question_bank_id}</th>
      <td>{bank[1].question_bank_name}</td>
      <td>{bank[1].question_bank_description}</td>
      <td>
          <Link to = {`/questionBanks/${bank[1].question_bank_id}`}><button className='btn btn-primary m-2'> View</button></Link>
          <button className='btn btn-danger m-2' onClick={()=>{
            deleteQuestionBank(bank[1])
          }}> Delete</button>
          <button className='btn btn-info m-2'> Edit</button>
      </td>
    </tr>
      )
    })}
  </tbody>
  </table>
  </div>

    </>
  )
}
