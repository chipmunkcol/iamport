import React, { useRef, useState } from 'react';
import './style/main.css';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';

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

  // 아임포트 결제하기
  const { IMP } = window;
  IMP?.init(process.env.REACT_APP_IAMPORT_APIKEY);

  const handlePaymentRequest = () => {

    const paymentData: RequestPayParams = {
    pg : 'mobilians.test',
    pay_method : 'phone',
    merchant_uid: "order_no_0001", //상점에서 생성한 고유 주문번호
    name : '주문명:결제테스트',
    amount : 1004,
    buyer_email : 'test@portone.io',
    buyer_name : '구매자이름',
    buyer_tel : '010-1234-5678',  //필수 
    buyer_addr : '서울특별시 강남구 삼성동',
    buyer_postcode : '123-456',
    m_redirect_url : '{모바일에서 결제 완료 후 리디렉션 될 URL}'
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
