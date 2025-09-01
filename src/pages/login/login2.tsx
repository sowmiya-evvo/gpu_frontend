import React, { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getModulePermission,
  groupSyncApi,
  login,
} from "../../service/common.service";
import { decryptText } from "../../utils/index";
import { MODULES } from "../../constants";
import { setUserStationList, setUserStationRec } from "../../app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import LoginLeftSide from "../../components/Auth/SignIn/Index";


const Login2 = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const account = useAccount(accounts[0] || {});
  const [loaderStatus, setLoaderStatus] = useState(1);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  const validateCredentials = (
    email: string,
    password: string
  ): string | null => {
    if (!email) {
      return "Email is required.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleLogin = async () => {
    if (!navigator.onLine) {
      setError("Internal server error. Please try again.");
      return;
    }

    const validationError = validateCredentials(userName, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        email: userName,
        password: password,
        module: MODULES.LOGIN

      };

      const response: any = await login(payload);

      if (response?.status === 200) {
        console.log('response?.data?.data>>', response?.data?.data)
        const stationList = response?.data?.data?.userStationRecord?.stationRecord.map((record: any) => record.id) || []
        const stationRecord = response?.data?.data?.userStationRecord?.stationRecord || []
        // console.log('stationList>>',stationList)
        dispatch(setUserStationList(stationList))
        dispatch(setUserStationRec(stationRecord))

        const encryptedName = response?.data?.data.name;
        // const decryptedName = decryptText(encryptedName);
        const dataStore = {
          email: response?.data?.data.email,
          isEmailVerified: response?.data?.data.isEmailVerified,
          name: encryptedName,
          userId: response?.data?.data.userId,
          token: response?.data?.data.token,
          login: false,
          station_id: response?.data?.data?.station_id,
          rank: response?.data?.data.rank,
          userStationRecord: {
            accessList: response?.data?.data?.userStationRecord?.accessList || [],
            rbacData: response?.data?.data?.userStationRecord?.rbacData || [],
            stationRecord: response?.data?.data?.userStationRecord?.stationRecord || []

          },
          division: response?.data?.data?.division

          // stationRecord:response?.data?.data?.userStationRecord?.stationRecord || [],
          // accessList:response?.data?.data?.userStationRecord?.accessList || []
        };

        // console.log('dataStore>>',dataStore)

        localStorage.setItem("userData", JSON.stringify(dataStore));

        // console.log(checkRecord, "-<<checkRecord");

        const { accessStatus, errMsg, moduleUrl } = await getModulePermission()
        // console.log(' accessStatus das>>',accessStatus,errMsg,moduleUrl)

        if (!accessStatus) {
          setError(errMsg || "Error occurred during login.");
        }
        else {
          navigate(moduleUrl)
        }
        //navigate("/dashboard");
      } else {
        setError(response?.data?.message || "Error occurred during login.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
const [rememberMe, setRememberMe] = useState(false);



  // const decodeJwt = (token: string) => {
  //   try {
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
  //         .join('')
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {

  //   const hash = window.location.hash;
  //   const params = new URLSearchParams(hash.replace("#", ""));
  //   const token: any = params.get("token");

  //   console.log(token, '-<<token...')
  //   // return 
  //   if (token) {
  //     const decodedToken = decodeJwt(token);

  //     if (!decodedToken) {
  //       console.error("Invalid token");
  //       navigate("/auth");
  //       return;
  //     }

  //     const azureData = {
  //       token: token,
  //       login: true,
  //     };
  //     localStorage.setItem("azureData", JSON.stringify(azureData));
  //     localStorage.setItem("decodedToken", JSON.stringify(decodedToken));

  //     console.log(account, '-<<account', instance, '-<<instance')
  //     if (decodedToken) {
  //       navigate('/dashboard')

  //     }
  //   } else {
  //     console.error("No token found in the URL");
  //     navigate("/auth");
  //   }

  // }, [navigate]);


  return (
    <>
        <div className="loginPageCenter">
        <div className="loginPageWrapper">

          <LoginLeftSide/>
          <div className="loginPageRight">
            {loaderStatus == 0 && (
              <div className="pageLoader">
                <span className="spinner"></span>
              </div>
            )}
            <div className="loginrightForm">
                <div className="loginLogo"><img src="../../../assets/images/evvo-logo.png" alt="logo"/></div>
                  <h2>Welcome back!</h2>
                  <p className="subtext">Please enter your credentials to sign in!</p>

                  <div className="loginFormWrap">
                    <div className="form-group">
                      <Form.Label >Email</Form.Label>
                      <InputGroup>
                        <Form.Control
                          placeholder="Enter your Email"
                          aria-label="Username"
                          // aria-describedby="basic-addon1"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                    <div className="form-group mb-0"> 
                      <Form.Label >Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          placeholder="Enter your Password"
                          aria-label="Password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputGroup.Text
                          id="basic-addon1"
                          className={
                            showPassword
                              ? "icon-password-unlock cursor-pointer"
                              : "icon-password-lock cursor-pointer"
                          }
                          onClick={togglePasswordVisibility}
                        ></InputGroup.Text>
                      </InputGroup>
                    </div> 
                  </div>
                  <div className="formRow">
                    <div className="customCheckBox">
                      <input
                        type="checkbox"
                        id="rememberCheck"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="rememberCheck">Remember my preference</label>
                    </div>
                    <a href="/forget-password" className="forgotLink">Forgot Password?</a>
                  </div>

                  {error && <p className="text-danger">{error}</p>}
                  <div className="submitBtn-wrap mt-2 pt-1">
                    <Button
                      variant="primary"
                      className="w-100 text-start"
                      onClick={handleLogin}
                    >
                      Sign In 
                    </Button>
                    {/* <Button
                      variant="outline-secondary"
                      className="w-100 text-start mt-4 logBtnSec"
                      onClick={() => {
                        const redirectUrl =
                          process.env.REACT_APP_SSO_REDIRECT_URL || "";
                        window.location.href = redirectUrl;
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5216 0.5H0V11.9067H11.5216V0.5Z"
                          fill="#f25022"
                        ></path>
                        <path
                          d="M24.2418 0.5H12.7202V11.9067H24.2418V0.5Z"
                          fill="#7fba00"
                        ></path>
                        <path
                          d="M11.5216 13.0933H0V24.5H11.5216V13.0933Z"
                          fill="#00a4ef"
                        ></path>
                        <path
                          d="M24.2418 13.0933H12.7202V24.5H24.2418V13.0933Z"
                          fill="#ffb900"
                        ></path>
                      </svg>
                      Log in with Microsoft
                    </Button> */}
                  </div> 

                  <div className="form-saprater">
                    <p>or</p>
                  </div>

                  <div className="socialLogin mt-4 pt-2">
                      <a href="#" className="gmail"><img src="../../../assets/images/ic-gmail.svg" alt="gmail" /></a>
                      <a href="#"><img src="../../../assets/images/ic-facebook.svg" alt="facebook" /></a>
                      <a href="#"><img src="../../../assets/images/ic-git.svg" alt="github" /></a>
                  </div>

                  <div className="mt-4 text-center fs-14">
                      <span>Don't have an account yet?</span>
                      <a className="color-theme ms-2" href="signup.html">Sign up</a>
                  </div>

                  {/* <div className="linkSignUp">Don't have an account  <a href="/">Sign-Up</a></div> */}
              </div>
            </div>
          </div>
        </div>
        
      {/* </div> */}
    </>
  );
};

export default Login2;
