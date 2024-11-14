import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const Wrapper = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
       <Footer /> 
    </div>
  );
};

export default Wrapper;
