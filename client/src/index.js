import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';

ReactDOM.render(
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>,
  document.getElementById('root')
);