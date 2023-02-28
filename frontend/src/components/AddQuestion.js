import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";





function AddQuestion(props) {

    const [questionHeader, setQuestionHeader] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questionBankId, setQuestionBankId] = useState('');
    const [option_1, setOption_1] = useState(null);
    const [option_2, setOption_2] = useState(null);
    const [option_3, setOption_3] = useState(null);
    const [option_4, setOption_4] = useState(null);
    const [option_5, setOption_5] = useState(null);
    const [option_6, setOption_6] = useState(null);
    const [option_7, setOption_7] = useState(null);
    const [option_8, setOption_8] = useState(null);
    const [questionType, setQuestionType] = useState('');
    const [rerenderComponent, setRerenderComponent] = useState('');
    const [arr, setArr] = useState([1,2,3,4]);
     let options = {}
    useEffect(() => {
        renderBasedOnQuestionType()
    }, [])

    const formSubmit = (e)=>{
        e.preventDefault();
    
        axios.post(`http://localhost:4000/questionBank/createQuestion${questionType}`, {
            questionHeader,
            correctAnswer,
            questionBankId,
            option_1,
            option_2,
            option_3,
            option_4,
            option_5,
            option_6,
            option_7,
            option_8
        }).then(data=>{
          props.rerender()
          props.hidePopup(false)
        })
      }

    const handleOnChange = (e)=>{
        // e.preventDefault();
        setQuestionType(e.target.value)
        console.log(e.target.value,'value');
    }
    const renderBasedOnQuestionType = ()=>{
        let result
        
        console.log(questionType,'/////')
        questionType === "Mcq" &&
        (result =
            <div>
                <h5 className='m-3 '>Question Header</h5>
                 <textarea autoFocus class="form-control m-3" id="exampleFormControlTextarea1" rows="3" 
                 onChange={(e)=>{
                    // setName(e.target.value)
                }}/>
                {arr.map(function(arr, i){
                        return <>
                        <h5 className='m-3'>Choice # {i+1}</h5>
                    <input
                        className = "form-control form-control-lg m-3"
                        type = "text"
                        aria-label = ".form-control-lg example"
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                    </>
                    })}
                    <div className='row justify-content-end' >
                        <div className='col-1 '>
                            <button className='btn btn-secondary' onClick={(e)=>{
                                if(arr.length <= 7) 
                                {
                                    arr.push(0)
                                    setArr(arr)
                                    setRerenderComponent(e)
                            }else{
                                console.log("no more choices");
                            }
                        }}>
                                <FontAwesomeIcon icon= {faPlus} size="x3"/>
                            </button>
                        </div>
                        <div className='col-1 '>
                            <button className='btn btn-secondary' onClick={(e)=>{
                                if(arr.length > 2) 
                                {
                                    arr.pop()
                                    setArr(arr)
                                    setRerenderComponent(e)
                            }else{
                                console.log("no more choices")
                            }
                        }}>
                                <FontAwesomeIcon icon= {faMinus} size="x3"/>
                            </button>
                        </div>
                    </div>
             </div>
             )
        questionType === "Essay" &&
        (result = 
        <div>
            <h5 className='m-3 '>Question Header</h5>
            <textarea autoFocus class="form-control m-3" id="exampleFormControlTextarea1" rows="3" 
                 onChange={(e)=>{
                    // setName(e.target.value)
                }}/>
            <h5 className='m-3 '>Question Answer</h5>
             <input
                autoFocus
                className="form-control form-control-lg m-3"
                type="text"
                placeholder="Answer"
                aria-label=".form-control-lg example"
                onChange={(e)=>{
                    // setName(e.target.value)
                }}
             />
        </div>
     
            )

        return result
    }


  
    return (
      <div className='container'>
        <h1 className='m-3 w-75'>Add Question</h1>
        <form onSubmit={
          formSubmit
          
        }>
            <h5 className='m-3 mt-5'>Choose Question Type</h5>
            <select className="form-select m-3" aria-label="Default select example" value={questionType} onChange={handleOnChange}>
                <option selected>Choose Question Type</option>
                <option value="Mcq">MCQ</option>
                <option value="Essay">Essay</option>
            </select>
            {renderBasedOnQuestionType()}
          <button type='submit' onClick={()=>{
            console.log(options, 'ANSWERSSSSSANSWERSSS')

          }} className='btn btn-primary mt-3 w-25'> Add</button>
        </form>
        
      </div>
    )
}

export default AddQuestion
