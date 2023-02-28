import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import AddQuestion from './AddQuestion'
import Popup from './Popup'


function ViewQuestionBank() {
    let {questionBankId} = useParams()
    const [questions, setQuestions] = useState([])
    const [buttonPopup, setButtonPopup]= useState(false)
    

    useEffect(() => {
        // document.addEventListener("click", handleClickOutside, true)
        getQuestions()
      }, [])

    // const handleClickOutside = (e)=>{
    //     if(!refOne.current.contains(e.target)){
    //       console.log("outside");
    //       setButtonPopup(false)
    //     }else{
    //       console.log("inside");
    //     }
    // }
    
    const getQuestions = ()=>{
        axios.get(`http://localhost:4000/questionBank/getQuestions?questionBank=${questionBankId}`)
        .then((res)=> {
          console.log(res.data[0].question_header, '/////////');
          setQuestions(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
     }

  return (
    <>
        
       
    <div className='container m-5'>
        <Popup trigger  = {buttonPopup} setTrigger = {setButtonPopup} >
          <AddQuestion rerender = {getQuestions} hidePopup = {setButtonPopup}></AddQuestion>
        </Popup>
      <div className='row m-5'>
        <div className='col-9'>

      <h1 className=''>Questions of Question Bank # {questionBankId}</h1>
        </div>

        <div className='col-3'>
    <button onClick={()=>
      setButtonPopup(true)
    } className="btn btn-success m-2">
      Add New Question
    </button>
        
        </div>

      </div>
      {Object.entries(questions).map((question, i)=>{
        console.log(question[1])
        if(question[1].question_type == 'essay'){
            return(
            <div className="card m-5 ">
              <h5 className="card-header bg-primary text-white">Question {i+1}</h5>
              <div className="card-body  m-2">
                  <h4 className="card-title mb-4">{question[1].question_header}</h4>
                  <hr></hr>
                  <h5 className="card-text mb-4">Answer: {question[1].correct_answer}</h5>
                  <div className='row'>
                      <div className='col-2'>
                        <Link href="#" className="btn btn-success m-2 w-100">Edit</Link>
                      </div>
                      <div className='col-2'>
                        <Link href="#" className="btn btn-danger m-2 w-100">Delete</Link>
                      </div>
                    </div>
              </div>
            </div>
      )
        }
        else {
            return(
                <div className="card m-5 ">
                <h5 className="card-header text-white bg-primary ">Question {i+1}</h5>
                <div className="card-body m-2">
                    <h4 className="card-title mb-4">{question[1].question_header}</h4>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-6'>
                        {question[1].answer_option_1 != null 
                        &&
                        question[1].answer_option_1 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>1- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_1}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>1- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_1}</h5>
                    </div>
                    </div>
                    </div>
                                }
                                {question[1].answer_option_3 != null 
                        &&
                        question[1].answer_option_3 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>3- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_3}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>3- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_3}</h5>
                    </div>
                    </div>
                    </div>
                                }
                                {question[1].answer_option_5 != null 
                        &&
                        question[1].answer_option_5 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>5- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_5}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>5- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_5}</h5>
                    </div>
                    </div>
                    </div>
                                }
                                {question[1].answer_option_7 != null 
                        &&
                        question[1].answer_option_7 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                        <h6>7- &nbsp; </h6>                      
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                        </div>
                        <div className='col-10'>
                        <h5 className='mcq-checkbox'>{question[1].answer_option_7}</h5>
                        </div>
                        </div>
                        </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>7- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_7}</h5>
                    </div>
                    </div>
                    </div>
                                }
                        </div>
                        <div className='col-6'>
                        {question[1].answer_option_2 != null 
                        &&
                        question[1].answer_option_2 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                        <h6>2- &nbsp; </h6>                      
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                        </div>
                        <div className='col-10'>
                        <h5 className='mcq-checkbox'>{question[1].answer_option_2}</h5>
                        </div>
                        </div>
                        </div>
                        :
                          <div className='container'>
                            <div className='row'>
                            <div className='col-2 d-flex flex-row justify-content-end'>
                        <h6>2- &nbsp; </h6>                      
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                        </div>
                        <div className='col-10'>
                        <h5 className='mcq-checkbox'>{question[1].answer_option_2}</h5>
                        </div>
                        </div>
                        </div>
                                }
                                {question[1].answer_option_4 != null 
                        &&
                        question[1].answer_option_4 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>4- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_4}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>4- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_4}</h5>
                    </div>
                    </div>
                    </div>
                                }
                                {question[1].answer_option_6 != null
                        &&
                        question[1].answer_option_6 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>6- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_6}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>6- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_6}</h5>
                    </div>
                    </div>
                    </div>
                                }
                                {question[1].answer_option_8 != null
                        &&
                        question[1].answer_option_8 == question[1].correct_answer
                        ?<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>8- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_8}</h5>
                    </div>
                    </div>
                    </div>
                        :<div className='container'>
                        <div className='row'>
                        <div className='col-2 d-flex flex-row justify-content-end'>
                    <h6>8- &nbsp; </h6>                      
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/> 
                    </div>
                    <div className='col-10'>
                    <h5 className='mcq-checkbox'>{question[1].answer_option_8}</h5>
                    </div>
                    </div>
                    </div>
                                }                     
                        </div>
                    </div>
                    <hr></hr>
                    <h5 className="card-text m-3">Answer: {question[1].correct_answer}</h5>
                    <div className='row'>
                      <div className='col-2'>
                        <Link href="#" className="btn btn-success m-2 w-100">Edit</Link>
                      </div>
                      <div className='col-2'>
                        <Link href="#" className="btn btn-danger m-2 w-100">Delete</Link>
                      </div>
                    </div>

                </div>
              </div>
              )
        }
    })}
    </div>
    </>
  )
}


export default ViewQuestionBank
