import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SideNav,
  SideNavCollapse,
  SideNavLink,
  SideNavButton,
} from "@govtechsg/sgds-react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialName } from "../../app/features/sidebarSlice";
import { Spinner } from "react-bootstrap";
import { msalInstance } from "../../pages/login/msalConfig";
import { setTimerStatus } from "../../app/features/timer/timerSlice";
// import { socket } from "../../App";
import { signoutApi } from "../../service/common.service";
import { useMsal, useAccount } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MODULES, SENIOR_MANAGEMNT, USER_ROLES } from "../../constants";

const GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0";
// import { jwtDecode } from "jwt-decode";



const SideNavBar: React.FC = () => {

  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [loaderStatus, setLoaderStatus] = useState(0);


  const storedData = localStorage.getItem("userData") || localStorage.getItem("decodedToken");

  const userData: any = storedData ? JSON.parse(storedData) : null;


  //  console.log('userData1>>', userData?.userStationRecord?.rbacData[0].role_name

  //   )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading] = useState<boolean>(false);
  const timerStatus = useSelector(
    (state: any) => state.persistedReducer.timer.timerStatus
  );

  const trainingIdVal = useSelector(
    (state: any) => state.persistedReducer.timer.trainingIdVal
  );

  const activeItem = useSelector((state: any) => state.sidebar.initialName);
  const [isTrainingsOpen, setTrainingsOpen] = useState<boolean>(false);
  const [userModulesList, setRoleBasedModule] = useState<any>([])

  const handleItemClick = (
    e: any,
    itemName: string,
    pathName: any = "/user-management",
    toggleDropdown: boolean = false
  ) => {
    e.preventDefault();
    dispatch(setInitialName(itemName));
    if (itemName === "Trainings") {
      setTrainingsOpen((prevOpen) => !prevOpen);
    } else {
      setTrainingsOpen(false);
    }
    if (timerStatus === 1) {
      // console.log('userData2>>', userData)
      // console.log('userData3>>', userData.userId)
      // console.log('userData4>>', userData.userId.toString())
      const isConfirmed = window.confirm("Do you want to exit the screen ?");
      if (isConfirmed) {
        dispatch(setTimerStatus(0));

        /** socket-timer code start */

        // if (trainingIdVal !== "" && trainingIdVal !== undefined && socket)
        //   socket.emit(
        //     "removeUserFrWeb",
        //     JSON.stringify({
        //       trainingId: trainingIdVal,
        //       userId: userData.userId.toString(),
        //     })
        //   );
        /** socket-timer code end */

        navigate(pathName);
      }
    } else {
      if (pathName !== "") navigate(pathName);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     if (timerStatus === 1) {
  //       const isConfirmed = window.confirm("Do you want to exit the screen?");
  //       if (!isConfirmed) {
  //         return;
  //       } else {
  //          /** socket-timer code start */

  //         // if (socket) {
  //         //   socket.emit(
  //         //     "removeUserFrWeb",
  //         //     JSON.stringify({
  //         //       trainingId: trainingIdVal,
  //         //       userId: userData.userId.toString(),
  //         //     })
  //         //   );
  //         // }

  //         /** socket-timer code end */

  //       }
  //     }

  //     const accessToken = localStorage.getItem("azureData");
  //     console.log(accessToken, "-<< accessToken");

  //     // Call API for logout
  //     await signoutApi();

  //     // if (accessToken) {
  //     //   const activeAccount = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

  //     //   console.log(activeAccount, '0<<<activeAccount')
  //     //   if (activeAccount) {
  //     //     const logoutRequest = {
  //     //       // postLogoutRedirectUri: "https://wms-dev-frontend-webapp.azurewebsites.net/auth",
  //     //       postLogoutRedirectUri: "https://localhost:3000/auth",
  //     //       account: activeAccount,
  //     //     };

  //     //     console.log("Logging out from Azure AD...");

  //     //     try {
  //     //       console.log('here in ...')
  //     //       await msalInstance.logoutRedirect(logoutRequest);
  //     //     } catch (error) {
  //     //       console.error("MSAL Logout Redirect Error: ", error);
  //     //     }
  //     //   }
  //     // }


  //     await msalInstance.logoutPopup()
  //     msalInstance.clearCache();
  //     localStorage.clear();
  //     sessionStorage.clear();
  //     dispatch(setTimerStatus(0));
  //     console.log('here in navigate')

  //     if (!accessToken) {
  //       console.log('here in if condition.')
  //       navigate("/auth")
  //     }
  //     console.log('here in  after --- navigate')

  //     // // Clear cache after logout
  //     // msalInstance.clearCache();
  //     // localStorage.clear();
  //     // sessionStorage.clear();
  //     // dispatch(setTimerStatus(0));


  //     console.log("Redirecting to auth page...");
  //     // window.location.href = "https://wms-dev-frontend-webapp.azurewebsites.net/auth";

  //   } catch (error) {
  //     console.error("Logout error: ", error);
  //     navigate('/auth')
  //   }
  // };


  const handleLogout = async () => {
    try {

      if (timerStatus === 1) {
        const isConfirmed = window.confirm("Do you want to exit the screen ?");
        if (!isConfirmed) {
          return;
        } else {
          // if (socket)
          //   socket.emit(
          //     "removeUserFrWeb",
          //     JSON.stringify({
          //       trainingId: trainingIdVal,
          //       userId: userData.userId.toString(),
          //     })
          //   );
        }
      }


      const accessToken = localStorage.getItem("azureData")

      // console.log(accessToken, '-<<accessToken')
      // // dispatch({ type: "USER_LOGOUT" });

      const data = await signoutApi();
      localStorage.clear();

      console.log(data, '-<,data..')
      if (accessToken) {
        const logoutRequest = {
          postLogoutRedirectUri: window.location.origin + "/auth", // Redirect after logout
          account:
            msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0], // Clear specific account
        };

        await msalInstance.logoutRedirect(logoutRequest);
        // localStorage.clear();
        // sessionStorage.clear();
        // // msalInstance.logout();
        // msalInstance.clearCache();
      }

      dispatch(setTimerStatus(0));


      // const clearAllCookies = () => {
      //   document.cookie.split(';').forEach((cookie) => {
      //     const [name] = cookie.split('=');
      //     document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      //   });
      // };

      // // Call the function to clear all cookies
      // clearAllCookies();

      localStorage.clear();
      sessionStorage.clear();
      // msalInstance.logout();
      msalInstance.clearCache();



      navigate("/auth");
      window.location.reload();



    } catch (error) {
      console.error("Logout error: ", error);
      navigate("/auth");
    }
  };




  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: process.env.REACT_APP_CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
      redirectUri: `${process.env.REACT_APP_BASE_URL}/auth`,
    },
  });

  const logout = async () => {
    const userData = localStorage.getItem("userData")
    const azureData = localStorage.getItem("azureData")

    if (userData && !azureData) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/auth");

    } else {

      await signoutApi();
      localStorage.clear();
      sessionStorage.clear();

      console.log(msalInstance, '-<<msalInstance')
      await msalInstance.initialize(); // Ensure MSAL is initialized
      await msalInstance.logoutRedirect(); // Redirects without requiring user confirmation

      msalInstance.clearCache();

      console.log('here in navigate')

      window.location.reload();

      // if (!accessToken) {
      //   console.log('here in if condition.')
      navigate("/auth")
      // }


    }
  };





  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };


  useEffect(() => {

    // console.log('sdiebar data>>',userData,userData?.userStationRecord?.rbacData,userData)
    // if(userData?.userStationRecord)
    setRoleBasedModule(userData?.userStationRecord?.accessList ?? [])

    if (
      activeItem === "Manage Trainings" ||
      activeItem === "Live Training & Tracking" ||
      activeItem === "CompletedTraining" ||
      activeItem === "Live Training View" ||
      activeItem === "Live Training View2"
    ) {
      setTrainingsOpen(true);
    } else if (activeItem !== "Trainings") {
      setTrainingsOpen(false);
    }
    // console.log('sidebar')
  }, [activeItem]);


  return (
    <>
      <nav id="sidebar">
        <div className="sideBarSticky">
          {/* <div className="sidebar-header d-flex align-items-center">
            <div className="title">
              <h1 className="h5">{userData?.name || ""}</h1>
              <h1 className="h5">{userData?.rank || ""}</h1> */}
              {/* <h1 className="h5">
              {
                  userData?.userStationRecord?.rbacData[0]?.role_name==USER_ROLES.SENIOR_MANGEMENT ? (
                    `Senior Management (${USER_ROLES.COMMISSIONER},${USER_ROLES.DY_COMMISSIONER},${USER_ROLES.DIRECTOR_OPS})`
                  )
                  :
                  (
                    userData?.userStationRecord?.rbacData[0]?.role_name
                  )
                }

              </h1> */}
            {/* </div>
          </div> */}

          
          <SideNav className="list-unstyled">

            {
              userModulesList.length > 0 && userModulesList.includes(MODULES.DASHBOARD) && (
                <SideNav.Item
                  eventKey="Dashboard"
                  className={activeItem === "Dashboard" ? "active" : ""}
                >
                  <Link
                    to="/dashboard"
                    onClick={(e) => handleItemClick(e, "Dashboard", "/dashboard")}
                  >
                   <i className="icon icon-dashboard"></i> Dashboard
                  </Link>
                </SideNav.Item>
              )
            }

            {/* <SideNav.Item
                  eventKey="Dashboard"
                  className={activeItem === "Dashboard" ? "active" : ""}
                >
                  <Link
                    to="/dashboard"
                    onClick={(e) => handleItemClick(e, "Dashboard", "/dashboard")}
                  >
                    Dashboard
                  </Link>
                </SideNav.Item> */}


           <SideNav.Item
                  eventKey="explore-vm"
                  className={activeItem === "Explore VM" ? "active" : ""}
                >
                  <Link
                    to="/explore-vm"
                    onClick={(e) =>
                      handleItemClick(e, "explore-vm", "/explore-vm")
                    }
                  >
                    <i className="icon">
                      <svg className="menu-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height="0.9em" width="0.9em" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                      </svg>
                      </i> Explore VM
                  </Link>
                </SideNav.Item>

                <SideNav.Item
                  eventKey="vm-management"
                  className={activeItem === "VM management" ? "active" : ""}
                >
                  <Link
                    to="/vm-management"
                    onClick={(e) =>
                      handleItemClick(e, "vm-management", "/vm-management")
                    }
                  >
                    <i className="icon icon-profile-settings"></i> VM management
                  </Link>
                </SideNav.Item>

                

            

            
            
            {/* <SideNav.Item
              eventKey="Trainings"
              className={
                activeItem === "Trainings" ||
                  activeItem === "Manage Trainings" ||
                  activeItem === "Live Training & Tracking" ||
                  activeItem === "Live Training View" ||
                  activeItem === "CompletedTraining"
                  ? activeItem === "Trainings"
                    ? "active"
                    : "selected active"
                  : ""
              }
            >

              <SideNavButton
                onClick={(e) => handleItemClick(e, "Trainings", "", true)}
              >
                Trainings
              </SideNavButton>
              <SideNavCollapse in={isTrainingsOpen}>
                <>
                  {
                    userModulesList.length > 0 && userModulesList.includes(MODULES.MANAGE_TRAININGS) && (
                      <SideNavLink
                        eventKey="Manage Trainings"
                        className={
                          activeItem === "Manage Trainings" ? "active" : ""
                        }
                        as={Link}
                        to="/manage-trainings-events"
                        onClick={(e) =>
                          handleItemClick(
                            e,
                            "Manage Trainings",
                            "/manage-trainings-events"
                          )
                        }
                      >
                        Manage Trainings
                      </SideNavLink>
                    )
                  }
                  {
                    userModulesList.length > 0 && userModulesList.includes(MODULES.LIVE_DATA) && (
                      <SideNavLink
                        eventKey="Live Training & Tracking"
                        className={
                          activeItem === "Live Training & Tracking" ? "active" : ""
                        }
                        as={Link}
                        to="/live-training-and-tracking"
                        onClick={(e) =>
                          handleItemClick(
                            e,
                            "Live Training & Tracking",
                            "/live-training-and-tracking"
                          )
                        }
                      >
                        Live Training Data
                      </SideNavLink>
                    )
                  }
                  {
                    userModulesList.length > 0 && userModulesList.includes(MODULES.LIVE_VIEW) && (
                      <SideNavLink
                        eventKey="Live Training View"
                        className={
                          activeItem === "Live Training View" ? "active" : ""
                        }
                        as={Link}
                        to="/live-training-view"
                        onClick={(e) =>
                          handleItemClick(
                            e,
                            "Live Training View",
                            "/live-training-view"
                          )
                        }
                      >
                        Live Training View
                      </SideNavLink>
                    )
                  }

                  {
                    userModulesList.length > 0 && userModulesList.includes(MODULES.COMPLETED_TRAININGS) && (
                      <SideNavLink
                        eventKey="CompletedTraining"
                        className={
                          activeItem === "CompletedTraining" ? "active" : ""
                        }
                        as={Link}
                        to="/completed-training-and-tracking"
                        onClick={(e) =>
                          handleItemClick(
                            e,
                            "CompletedTraining",
                            "/completed-training-and-tracking"
                          )
                        }
                      >
                        Completed Trainings
                      </SideNavLink>
                    )
                  }
                </>
              </SideNavCollapse>
            </SideNav.Item> */}

             
                

                
             

           

            

                

                

                <SideNav.Item
                  eventKey="Assessments"
                  className={activeItem === "Activity Management" ? "active" : ""}
                >
                  <Link
                    to="/assessments"
                    onClick={(e) =>
                      handleItemClick(e, "Assessments", "/assessments")
                    }
                  >
                    <i className="icon icon-help"></i> Help & Support
                  </Link>
                </SideNav.Item>


                <SideNav.Item
                  eventKey="Assessments"
                  className={activeItem === "Activity Management" ? "active" : ""}
                >
                  <Link
                    to="/assessments"
                    onClick={(e) =>
                      handleItemClick(e, "Assessments", "/assessments")
                    }
                  >
                    <i className="icon icon-settings"></i> Settings
                  </Link>
                </SideNav.Item>

            {
              userModulesList.length > 0 && userModulesList.includes(MODULES.REPORTS) && (
                <SideNav.Item
                  eventKey="Reports"
                  className={activeItem === "reports" ? "active" : ""}
                >
                  <Link
                    to="/reports"
                    onClick={(e) => handleItemClick(e, "reports", "/reports")}
                  >
                   <i className="icon icon-ta"></i> Reports
                  </Link>
                </SideNav.Item>
              )
            }
           
            <SideNav.Item
              eventKey="Logout"
              className={activeItem === "Logout" ? "active" : ""}
              // onClick={handleLogout}
              onClick={logout}
            >
              <Link to="#">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <i className="icon icon-logout md-20"></i> Logout
                  </>
                )}
              </Link>
            </SideNav.Item>


          </SideNav>
        </div>
      </nav>
    </>
  );
};

export default SideNavBar;