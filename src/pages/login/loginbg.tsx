import React from 'react'

export default function loginbg() {
  return (
    <div className="container">
        <section className="form-section">
            <div className="left-container">
                <div className="logo">
                    <img src="../../../assets/images/newlogo.png" alt="logo"/>
                </div>
                <div className="content">  
                    <h1>Welcome!</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <div className="social-icons">
                       <i className="bi bi-facebook"></i>
                       <i className="bi bi-twitter"></i>
                       <i className="bi bi-linkedin"></i>
                    </div>
                    <footer className="footer">
                        <p>Copyright © 2025 Federated All rights reserved.</p>
                    </footer>
                </div>  
            </div>
            <div className="right-container">
                <h1>Sign In</h1>
                <p className="subtext">Sign In by entering Information below</p>
                <form className="sign-in">
                    <div className="input-box">
                        <label className="details">Email<span className="required">*</span></label>
                        <input type="email" name="email" placeholder="Enter Your Email" required/>
                    </div>
                    <div className="input-box">
                        <label className="details">Password<span className="required">*</span></label>
                        <input type="password" name="password" placeholder="Enter Password" required/>
                    </div>
                    <div className="input-box">
                        <label><input type="checkbox" className="checkbox"/>Remember my preference
                            <span><a href="forgetpass.html">Forget Password?</a></span></label>                         
                    </div>
                    <div className="input-box">
                        <div className="submitBtnWrap">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </div>
                    </div>
                    <div className="input-box">
                        <p>Don't have an account  <a href="#">Sign-Up</a></p>
                    </div>                    
                </form>
            </div>
        </section>
    </div>
  )
}
// export default Loginbg;