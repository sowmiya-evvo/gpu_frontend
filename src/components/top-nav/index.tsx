import React, { useEffect, useState } from "react";
import { Dropdown , Form , InputGroup, Button} from "react-bootstrap";
import { Link } from "react-router-dom";



const TopNav = () => {
  const handleToggleClass = () => {
    document.body.classList.toggle("sideMenuFixed");
  };

 const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Add or remove class from <body> when checkbox state changes
  useEffect(() => {
    const className = "dark";

    if (isChecked) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    // Optional cleanup (in case the component unmounts)
    return () => {
      document.body.classList.remove(className);
    };
  }, [isChecked]);
   

  return (
    <header className="header topHeader">
      <nav className="navbar navbar-expand-lg">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="navbar-header">
            <a className="navbar-brand">
              <img className="logo_img" src="../../assets/images/logo-white.png" alt="Evvo Logo"  />
            </a>
            {/* <span className="navbar-brand-cont">WMS</span> */}
            <Button variant="link" onClick={handleToggleClass} className="sidebar-toggle">
              <span className="toggle-icon"></span>
            </Button>
            
          </div>

          <div className="right-menu">
          {/* <div className="searchBar" >
            <input
              type="text"
              placeholder="Search by"
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
            />
            <Button className="searchBtn"><i className="icon-search"></i></Button>
          </div> */}
          <Dropdown className="notification-toggle">
            <Dropdown.Toggle className="nav-link  arrowHide" id="dropdown-basic">
              <span className="notificationIcon">
                  <img src="../../assets/images/notification-icon.svg" alt="notification" className="notificationIcon"/>
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="notificationTitle">
                <h5>Notifications</h5>
                <div className="icon">
                  <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path>
									</svg>
                </div>
              </div>
              <div className="notificationList">
                <div className="notificationListView">
                    <div className="icon"><img src="../../assets/images/male-profile.png" alt="thumb"  /></div>
                    <div className="cont">
                      <div className="name"><strong>Jean Bowman </strong> invited you to new project. </div>
                      <div className="date">4 minutes ago</div>
                    </div>
                </div>
                <div className="notificationListView">
                    <div className="icon"><img src="../../assets/images/male-profile.png" alt="thumb"  /></div>
                    <div className="cont">
                      <div className="name"><strong>Jean Bowman </strong> invited you to new project. </div>
                      <div className="date">4 minutes ago</div>
                    </div>
                </div>
                <div className="notificationListView">
                    <div className="icon"><img src="../../assets/images/male-profile.png" alt="thumb"  /></div>
                    <div className="cont">
                      <div className="name"><strong>Jean Bowman </strong> invited you to new project. </div>
                      <div className="date">4 minutes ago</div>
                    </div>
                </div>
                <Link className="link" to="" >View All Activity</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          

            <Dropdown className="profile-toggle">
            <Dropdown.Toggle className="nav-link  arrowHide" id="dropdown-basic">
              <div className="profielWrap">
                <span className="profileImg"><img  src="../../assets/images/male-profile.png" alt="user thumb" /></span>
                <div className="cont">
                    <h6>Admin</h6>
                    <h5>Carolyn Perkins</h5>
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="profielWrap">
                <span className="profileImg"><img  src="../../assets/images/male-profile.png" alt="user thumb" /></span>
                <div className="cont">
                    <h6>Admin</h6>
                    <h5>Carolyn Perkins</h5>
                </div>
              </div>
              <ul>
                <li>
                  <a href="#">
													<span className="icon">
														<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
														</svg>
													</span>
													<span>Profile</span>
										</a>
								</li>
                <li>
                  <a href="#">
													<span className="icon">
														<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
														</svg>
													</span>
													<span>Account Setting</span>
										</a>
								</li>
                 <li>
                  <a href="#">
													<span className="icon">
														<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
															<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
														</svg>
													</span>
													<span>Activity Log</span>
										</a>
								</li>
                <li>
                  <div className="d-flex gap-2 align-items-center headThemeChangeBlock">
                  <label className="switcher">
                    <input name="dark-mode-toggle" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  value="" />
                    <span className="switcher-toggle">Dark Theme</span>
                  </label>
                </div>
                </li>
                <li className="menu-item-divider"></li>
                <li>
                  <a href="#">
													<span className="icon">
														<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
														  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
													  </svg>
													</span>
													<span>Logout</span>
										</a>
								</li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
