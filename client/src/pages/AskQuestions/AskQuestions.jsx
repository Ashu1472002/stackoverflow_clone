import React from 'react'
import './AskQuestions.css'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {askQuestion} from '../../actions/Question'

const AskQuestions = () => {

  const [questionTitle , setQuestionTitle] = useState('')
  const [questionBody , setQuestionBody] = useState('')
  const [questionTags , setQuestionTags] = useState('')
  
  const dispatch = useDispatch()
  const User =  useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle: questionTitle,
              questionBody: questionBody,
              questionTags: questionTags,
              userPosted: User.result.name,
              userId:User.result._id
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const handleEnter =(e) =>{
    if(e.key === 'Enter'){
        setQuestionBody(questionBody + "\n" );
    }
  };

  return (
    <div className='ask-question'>
        <div className='ask-ques-container'>
            <h1>Ask a public Questions</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagin you're asking a question to another person</p>
                        <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder="eg.if there is an R function for finding the index of an element in a vector? "/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone need to answer your question</p>
                        <textarea type="text" name="" cols='3' rows='3' onChange={(e) => {setQuestionBody(e.target.value)}} id='ask-ques-body' onKeyDown={handleEnter}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder="e.g. (xml typescript wordpress) "/>
                    </label>
                </div>
                <input type="submit" value="Review your Question" className='review-btn' />
            </form>
        </div>        
    </div>
  )
}

export default AskQuestions