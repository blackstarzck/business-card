import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import "./index.module.css";
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_respository';
import { BrowserRouter } from 'react-router-dom';

// Dependency Injection
const authService = new AuthService();
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository();

// Fileinput는 컴포넌트이다.
// 이미지업로드를 함수로 사용했을 때 부모 최상위 부터 자식까지 props로 너무 많이 전달되기 때문에 컴포넌트를 만들어 전달한다.
const FileInput = memo(props => {
  return (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/business-card">
      <App
        authService={authService}
        FileInput={FileInput}
        cardRepository={cardRepository}
      />
    </BrowserRouter>
  </React.StrictMode>
);
