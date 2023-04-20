import React, { useRef, useState } from 'react';
import './style/main.css';

function App() {

  const [profileImg, setProfileImg] = useState<any>("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const inputRef = useRef<any>(null);

  const [file, setFile] = useState('');

  const onChangeFile = (e:any) => {
    console.log(e.target.files[0]);
    if(e.target.files[0]) {
      setFile(e.target.files[0]) // file은 file대로 담고 profileImg는 이미지대로 담는다.
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target?.result;
      setProfileImg(fileData);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  

  return (
    <div style={{ width:'100vw', height:'100vh' }}>
      {/* header */}
      <div className='header'>
        <div className='logo'>KO-MAPPER</div>
        <div className='profile'>관리자{'('}ADMIN{')'}</div>
      </div>

      {/* leftPanel1 */}
      <div className='flex-box'>
        <div className='leftPanel'>
          <div>MOSAIC</div>
        </div>

      {/* leftPanel2 */}
        <div className='leftPanel2'>
          leftpanel2
        </div>
      
      {/* 결제 컴포넌트? */}
        {/* <button className='payment-btn'>결제하기</button> */}

        <div className="profile">
          <img src={ profileImg } alt='profileImg' onClick={ () => inputRef.current.click() }/>
          <input 
          type="file"
          ref={ inputRef }
          style={{ display:'none' }}
          onChange={onChangeFile}
          />
          
          <div>name</div>
        </div>
      </div>
    </div>
  );
}

export default App;
