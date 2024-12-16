import React,{useEffect, useState} from 'react'
import axios from '../api/axiosIns'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"

const Signup=()=>{
    const [step,setStep]=useState(1)
    const [formData,setFormData]=useState({
        username:'',
        password:'',
        confirmPassword:'',
        height:'',
        weight:'',
        age:''})

    const [error,setError]=useState("")

    const navigate=useNavigate()

    useEffect(()=>{
        if(step===3){
            alert("회원가입 완료")
        }
    },[step])

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
        
    const nextStep=()=>{
        // Step.1 : Id 랑 비번 검증
        if(step===1){
            if(!formData.username || !formData.password){
                setError("ID와 비밀번호를 입력해")
                return
            }
            if(formData.password !==formData.confirmPassword){
                setError('비번과 재입력한 비번이 불일치')
                return
            }
            setError("")
        }

        // step.2 : 키와 몸무게 검증
        if(step===2){
            if(!formData.height || !formData.weight){
                setError("키와 몸무게를 입력")
                return
            }
            setError("")
        }

        if(step<3){
            setStep(step+1)
        }
    }

    const handleRestart=()=>{
        navigate("/")
    }

    const handleLogin=()=>{
        navigate("/login")
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('/api/signup',formData)
            window.alert(response.data.message);
        }catch (error){
            console.error('회원가입 실패:',error)
            window.alert("회원가입 실패")
        }
    }


    return(
        <form onSubmit={handleSubmit}>        
            <div className='signup-steps'>
                {step===1&&(
                <div className='step-container'>
                    <h2 className='step-title'>Step 1 : 개인정보 입력</h2>
                    <div className='form-group'>
                    <label>ID :</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='아이디 입력'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='form-group'>
                    <label>비밀번호 :</label>
                    <input 
                        type='password'
                        name='password'
                        placeholder='비밀번호 입력'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='form-group'>
                    <label> 비밀번호 재입력 :</label>
                    <input 
                        type='password'
                        name='confirmPassword'
                        placeholder='비밀번호 재입력'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    {error && <p className='error-message'>{error}</p> }
                    <button className='next-button' onClick={nextStep}>
                    입력 완료/ 다음 스텝
                    </button>
                </div>
                )}

                {step===2&&(
                <div className='step-container'>
                    <h2 className='step-title'>Step 2 : 추가정보입력</h2>
                    <div className='form-group'>
                    <label> 키 :</label>
                    <input
                        type='text'
                        name='height'
                        placeholder='키 입력'
                        value={formData.height}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='form-group'>
                    <label>몸무게 :</label>
                    <input
                        type='text'
                        name='weight'
                        placeholder='몸무게 입력'
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='form-group'>
                    <label >나이 (선택사항) :</label>
                    <input 
                        type='number'
                        name='age'
                        placeholder='나이 입력'
                        value={formData.age}
                        onChange={handleChange}
                    />
                    </div>
                    {error && <p className='error-message'>{error}</p> }
                    <button className='next-button' onClick={nextStep}>
                    완료
                    </button>
                </div>
                )}

                {step===3&&(
                <div className='step-container'>
                    <h2 className='step-title'>Step 3 : 회원가입 완료</h2>
                    <div className='button-group'>
                    <button className='complete-button' onClick={handleRestart}>
                        초기 페이지로
                    </button>
                    <button className='login-button' onClick={handleLogin}>
                        로그인 페이지로
                    </button>
                    </div>
                </div>
                )}
            </div>
        </form>
    )

}





export default Signup;