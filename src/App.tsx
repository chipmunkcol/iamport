import React, { useRef, useState } from 'react';
import './style/main.css';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import process from 'process';

function App() {

  const [profileImg, setProfileImg] = useState<any>("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const inputRef = useRef<any>(null);

  const [file, setFile] = useState('');

  const onChangeFile = (e: any) => {
    if(e.target.files[0]) {
      setFile(e.target.files[0]) // file은 file대로 담아서 api call 할 때 같이 담아주자.
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target?.result;
      setProfileImg(fileData);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
  const handlePaymentRequest = () => {
    const { IMP } = window;
    IMP?.init(process.env.REACT_APP_IAMPORT_APIKEY);

    const paymentData: RequestPayParams = {
      pg: 'html5_inicis', // 결제사 코드
      pay_method: 'card', // 결제 수단
      merchant_uid: 'merchant_' + new Date().getTime(), // 주문번호
      amount: 1000, // 결제 금액
      name: '아이템명', // 상품명
      buyer_name: '구매자 이름', // 구매자 이름
      buyer_tel: '구매자 전화번호', // 구매자 전화번호
      buyer_email: '구매자 이메일', // 구매자 이메일
    }

    IMP?.request_pay(paymentData, paymentSuccess)
  }

  const paymentSuccess = (res: RequestPayResponse) => {
    const { imp_uid, merchant_uid } = res;
    console.log(imp_uid, merchant_uid);
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
      
      

        <div className="profile">
          <div className='title'>프로필</div>
          <img src={ profileImg } alt='profileImg' onClick={ () => inputRef.current.click() }/>
          <input 
          type="file"
          ref={ inputRef }
          style={{ display:'none' }}
          onChange={ onChangeFile }
          />
          
          <div>name</div>
          <div>id</div>
        </div>

        <div className='payment'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg' alt='bridge'/>
          <img src='https://img.staticmb.com/mbcontent//images/uploads/2021/9/what-are-the-different-types-of-land-use-zones.jpg' alt='land'/>
          <img src='https://www.kfpa.or.kr/images/sub/check1_img01.jpg' alt='safety always'/>
          
          <div className='payment-btn'>
            <button onClick={handlePaymentRequest}>결제하기</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
