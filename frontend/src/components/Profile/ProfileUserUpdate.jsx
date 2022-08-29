import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteUser, postPWCheck } from '../../api/Auth'
import { putUserInfo } from '../../api/User'
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";


const ProfileUserUpdate = (props) => {
  const navigate = useNavigate()
  const [userAuth, setAuth] = useRecoilState(auth);
  const { profileName, isMyPage, userProfile, tierColor } = props
  const utags= [ '즐겜러', '빡겜러', '초보', '중수', '고수', '생존겜 러버']
  const userId = useState(profileName)
  const [trialCnt, setTrialCnt] = useState(1)
  const [tmpPw, setTmpPw] = useState('')
  const [tmpPwConfirm, setTmpPwConfirm] = useState('')
  const [pwUpdate, setPwUpdate] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState("");

  
  const [updateInfo, setUpdateInfo] = useState({
    userName:userProfile.userName, // 닉네임
    userTags: utags.map((tag, idx)=>{
      if (userProfile.userTags.includes(tag)) {
        return (idx + 1)
      }
      return null
    }).filter((el)=> el), // 유저 태그
    userPassword:-1  // 변경 사항 없음
  })


  //비밀번호 확인 swal
  const pwCheckSwal = Swal.mixin({
    html: `<strong>${profileName}님</strong> <br><br>정보 수정을 위해 <br> 비밀번호를 입력해주세요.`,
    input: 'password',
    showCancelButton: true,
    confirmButtonText: '<strong>입력</strong>',
    cancelButtonText: '<strong>취소</strong>',
    confirmButtonColor: '#43B5A0',
    cancelButtonColor: '#A9ACB1',
    inputPlaceholder: '비밀번호를 입력하세요.',
    inputAttributes: {
      maxlength: 30,
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })

  const SuccessToast = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 1000,
  })

  const FailureToast = Swal.mixin({
    buttonsStyling: false,
    toast: true,
    position: 'center',
    showConfirmButton: true,
  })


  useEffect(
    () => {
      if (!isMyPage) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "잘못된 접근입니다.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/')
      }

      pwCheckSwal.fire().then((res)=>{
        if(res.isConfirmed){
          const user = {
            "user_service_id": userId[0],
            "user_service_pw": res.value
          }
          postPWCheck(user)
            .then((response)=>{
              if (response.data.statusCode === 200) {
                SuccessToast.fire(
                  {
                    showConfirmButton: false,    
                    icon: 'success',
                    title: '회원 인증 성공!'
                  }
                )
              } else if (response.data.statusCode === 401){
                if(trialCnt < 5){
                  FailureToast.fire(
                    {
                      customClass: {
                        confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-pink text-white w-full',
                      },
                      icon: 'error',
                      title: `회원 인증 ${trialCnt}회 실패... <br> 비밀번호를 확인하세요.`
                    })
                    .then(()=>{
                      setTrialCnt(trialCnt+1)
                    }
                  ) 
                } else{
                  FailureToast.fire(
                    {
                      customClass: {
                        confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-yellow text-white w-full',
                      },
                      icon: 'warning',
                      title: `비밀번호를 5회 틀렸습니다. <br> 비밀번호 확인 후 시도해주세요.`
                    })
                    .then(()=>{
                      navigate(`/mypage/${userId[0]}`)
                    }
                  ) 
                }
              }
            }
            ).catch((err)=>{
              console.log(err)
              FailureToast.fire(
                {
                  customClass: {
                    confirmButton: 'mx-2 rounded py-1 px-5 bg-moa-pink-dark text-white w-full',
                  },
                  icon: 'error',
                  title: `Server Error! 잠시 후 다시 시도해주세요.`
                }).then(navigate(-1))
            })
        } else if (res.isDismissed){
          navigate(-1)
        }
      }
      )
    }, [trialCnt]
  )

  useEffect(()=>{
    if(tmpPw&&!passwordMessage&&(tmpPw===tmpPwConfirm)){
      setPwUpdate(true)
    } else {
      setPwUpdate(false)
    }
  }, [tmpPw, tmpPwConfirm])
  
  useEffect(()=>{
    if(pwUpdate){
      setUpdateInfo({...updateInfo, userPassword:tmpPw})
    }else{
      setUpdateInfo({...updateInfo, userPassword:-1})
    }
  }, [pwUpdate])


  const changeHandler = (checked, id) => {
    if (checked) {
      setUpdateInfo({...updateInfo, userTags: [...updateInfo.userTags, id+1]})
    } else {
      // 체크 해제
      setUpdateInfo({...updateInfo, userTags: updateInfo.userTags.filter((el) => el !== id+1)});
    }
  };

  const onChangeUserName = (e) => {
    const val = e.target.value
    if (val.length <= 30){
      setUpdateInfo({...updateInfo, userName:val})
    }
  }

  const onChangePw = (e) => {
    const val = e.target.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setTmpPw(val);
    if (!passwordRegex.test(val)&&val) {
      setPasswordMessage("* 비밀번호가 유효하지 않습니다.");
    } else {
      setPasswordMessage("");
    }
  }

  const onChangePwConfirm = (e) => {
    const val = e.target.value;
    setTmpPwConfirm(val);
  }

  const onSubmit = () => {
    putUserInfo(updateInfo)
      .then((res)=>{
        SuccessToast.fire(
          {
            showConfirmButton: false,    
            icon: 'success',
            title: '변경사항 저장 완료!'
          }
        ).then(setTimeout(navigate(`/mypage/${userProfile.userServiceId}`),800))
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  const onDeleteUser = () => {
    Swal.fire({
      title: "정말 탈퇴하시겠어요? &&#128546",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A9ACB1',
      cancelButtonColor: '#C22A66',
      confirmButtonText: '탈퇴하기',
      cancelButtonText: '취소하기',
      focusConfirm:false,
      focusCancel:true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userProfile.userServiceId)
          .then((res)=>{
            setAuth({
              isLoggedIn:false, //인증상태
              token:null, //access token
              userId: null,
            });
            sessionStorage.removeItem('token')
            Swal.fire({
              position: "center",
              icon: "success",
              title: "탈퇴 성공... &#128557",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/')
          })
      }
    })
  }


  return (
    <div className='py-12 tablet:py-10 px-[7%] w-full h-full'>
      <div className='flex mb-2 w-full mx-auto max-w-[700px]'>
        <div className={`w-2 ${tierColor.tierManner}`}></div>
        <div className={`ml-3 text-2xl font-bold ${tierColor.tiertextLight}`}>회원정보 수정</div>
      </div>
      <hr className='mx-auto max-w-[700px] w-full' />

      <div className='rounded mt-3 w-full mx-auto bg-zinc-300 p-6 max-w-[700px]'>
          <label htmlFor="nickname"
                 className="block mb-2 text-sm font-semibold text-gray-900">
            닉네임
          </label>
          <input type="text" 
                 id = "nickname"
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2'
                 value={updateInfo.userName} 
                 onChange={onChangeUserName} 
                 placeholder="자신을 표현할 수 있는 닉네임을 적어주세요 (30자 이하)"/>

        <div className='mt-7'>
          <span className='block mb-2 text-sm font-semibold text-gray-900'>유저태그</span>
          <div className='flex flex-wrap'>
            {utags.map((_,idx) =>{
              return(
                <label key={idx} className="mx-1.5">
                  <input type="checkbox" value={idx+1}         
                  onChange={(e)=>{
                              changeHandler(e.currentTarget.checked, idx)
                              }}
                  checked={updateInfo.userTags.includes(idx+1) ? true : false}
                  className='mr-1 w-4 h-4 text-teal-600 bg-gray-100 rounded border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600'/>{utags[idx]}
                </label>
              )
            })}
          </div>
        </div>
        
        {/* 비밀번호 변경 */}
        <div className="w-full mt-7">
          <span className='block mb-2 text-sm font-semibold text-gray-900'>비밀번호 변경 <span className='text-[10px] font-semibold text-gray-700'>[변경을 원할 시 입력해주세요]</span></span>
          <div className='px-3 py-5 rounded bg-mainBtn-disabled'>
            <label htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-900">
              새 비밀번호
            </label>
            <input type="password" 
                  id = "password"
                  className='mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2'
                  value={tmpPw} 
                  onChange={onChangePw} 
                  placeholder="숫자, 영문 대,소문자 , 특수문자(!@#$%^+=-) 포함 (8~25자)"
              />
            {(passwordMessage.length ? 
                <span className='text-rose-600'>{passwordMessage}</span>
                :
                <></>)}

            <label htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-900">
              비밀번호 확인
            </label>
            <input type="password" 
                  id = "password"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2'
                  value={tmpPwConfirm} 
                  onChange={onChangePwConfirm} 
                  placeholder="한번 더 비밀번호를 입력해주세요"
              />
            { (tmpPw.length&&tmpPwConfirm.length&&!(tmpPw === tmpPwConfirm) ? 
                <span className='text-rose-500'>* 비밀번호가 일치하지 않습니다.</span>
                :
                <></>)
            }
          </div>
        </div>
        <button 
          onClick={onSubmit}
          disabled={!(updateInfo.userName&&((updateInfo.userPassword===-1&&!tmpPw&&!tmpPwConfirm)||(pwUpdate&&updateInfo.userPassword!==-1)))}
          className={`mt-5 w-full 
                     focus:outline-none text-white 
                     ${tierColor.tierSide} hover:${tierColor.tierManner} disabled:bg-zinc-400
                     focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5`}>
          수정
        </button>
      </div>
      <div className='mx-auto mt-2.5 text-gray-400 text-xs flex justify-end hover:cursor-pointer w-full max-w-[700px]' onClick={onDeleteUser}>회원탈퇴</div>
    </div>
  )
}

export default ProfileUserUpdate