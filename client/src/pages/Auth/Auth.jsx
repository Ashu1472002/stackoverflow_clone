import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import{useNavigate} from 'react-router-dom'
import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup,login } from '../../actions/auth'

const Auth=() =>{

  const [isSignup,setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch =useDispatch()
  const navigate =useNavigate()

  const handleSwitch =()=>{
    setIsSignup(!isSignup)
  }

  const handelSubmit =(e) =>{
    e.preventDefault()
    if(!email && !password){
      alert("Enter email and pssword")
    }
    if(isSignup){
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name,email,password}, navigate))
    }else{
      dispatch(login({email, password},navigate))
    }
    
  }

  return (
    <section class='auth-section'>
      {isSignup && <AboutAuth />}
      <div class='auth-container'>
        {!isSignup && <img src={icon} alt='stack overflow' className='login-logo'/>}
        <form onSubmit={handelSubmit}>
          {isSignup && <label htmlFor="name"><h4>Display Name</h4>
                <input type="text" id="name" name="name" autoComplete='given-name' onChange={(e) => {setName(e.target.value)}}/>
              </label>
          }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" autoComplete='off' onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label htmlFor="password">
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color:"#007ac6",fontSize:"13px"}}>forgot password?</p>}
            </div>   
            <input type="password" name="password" id="password"  autoComplete='off' onChange={(e) => {setPassword(e.target.value)}}/>
            {isSignup && <p style={{color:"#666767",fontSize:"13px" , align:'center'}}>Passwords must contains atleast eight characters,includig atleast 1 letter and 1 number.</p>}

          </label>
          {isSignup && <label htmlFor='check'>
            <input type="checkbox" id="check" name='check' className='check-in'></input>
            <p style={{fontSize:"13px", marginLeft:"10px"}}>Opt-in to receive occasional,<br/>product updates,user research invitations<br/>company announcements,and digests.</p>
          </label>}
          <button type="submit" id='submit' name='submit' className='auth-btn'>{isSignup?'Sign Up':'Log in'}</button>
          {isSignup && (<p style={{color:"#666767",fontSize:"13px"}}>By clicking "Sign up", you agree to our 
                              <span style={{color:"#007ac6"}}> terms of service</span>,
                              <span style={{color:"#007ac6"}}> privacy policy</span> and 
                              <span style={{color:"#007ac6"}}> cookie policy</span>.</p>
                      )}
        </form>
        <p>
          {isSignup ? 'already have an account?':"Don't have an account?"}
          <button type="button" id='signup' name='handel-btn' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Log in":"sign up"}</button>
        </p>
      </div>
      
    </section>
  )
}

export default Auth