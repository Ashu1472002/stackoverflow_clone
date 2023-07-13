import React from 'react'
import Questions from './Questions'

const QuestionList = ({questionList}) => {
  return (
    <>
        {
            questionList.map((question)=>(
                <Questions key={question._id} question={question}  />
            ))
        }
    </>
  )
}

export default QuestionList