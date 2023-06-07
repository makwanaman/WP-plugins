import React from 'react'
import ProfileHeader from './ProfileHeader'
import Footer from '../layout/Footer';
const Main = ({children}) => {
  return (
    <div>
      <ProfileHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Main