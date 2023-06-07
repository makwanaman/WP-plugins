import React from 'react'
import Image from 'next/image'
import MailIcon from '../public/mail-icon.svg' 
const SubscribeForm = () => {
  return (
    <>
      <div className="code-box text-fade text-center">
        <div className="subscribe-form-box pt-3 pb-3">
          <h3 className="primary-text semi-bold">Subscribe now!</h3>
          <p className="text-fade">
            Enter your email to receive daily updates.
          </p>
          <form className="form-inline hero-form">
            <input
              className="form-control"
              type="email"
              placeholder="Your email"
            />
            <button className="btn btn-primary search-btn" type="submit">
              <span className="btn-mob-show">
                <Image alt="" src={MailIcon} />
              </span>
              <span className="btn-mob-hide">Subscribe</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SubscribeForm