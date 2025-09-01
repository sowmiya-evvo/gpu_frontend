import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Missing from "./pages/missing";
import Auth from "./pages/login/index";
import Login2 from "./pages/login/login2";
import Unauthorized from "./pages/unauthorized";
import AppLoading from "./components/Error/AppLoading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import "@govtechsg/sgds/css/sgds.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../src/pages/login/msalConfig";

import Dashboard from "./pages/dashboard";

import io from "socket.io-client";
import Forgetpass from "./pages/officer/auth/forgotpasscode";
import VerifyOtp from "./pages/officer/auth/forgotpasscode/verifyotp";
import NewPass from "./pages/officer/auth/forgotpasscode/newpassword";
import PassSuccess from "./pages/officer/auth/forgotpasscode/sucess";
import ExploreVM from "./pages/vm-management";
import VM_management from "./pages/vm-management/vm-management";

/** socket start code  */

// const userDetails: any = localStorage.getItem("userData");

// let userIdData: any = null;

// if (userDetails) {
//   try {
//     userIdData = JSON.parse(userDetails);
//   } catch (error) {
//     console.error("Error parsing user data:", error);
//   }
// }

// let socket: any;

// if (!userIdData || !userIdData.userId) {
//   console.error("User data is not available or invalid.");
// } else {
//   console.log("socket connect");
//   socket = io("https://wms-dev-backend-webapp.azurewebsites.net", {
//     path: "",
//     query: { userIDAdmin: userIdData.userId.toString() },
//   });
// }

/** socket end code  */

// const isAuthenticated = () => {
//   const token = localStorage.getItem("decodedToken");
//   return token !== null; // Check if the token exists
// };

const isAuthenticated = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedUserData: any = JSON.parse(userData);
    // Return true if token exists and is not null
    return parsedUserData.token !== null;
  } else {
    const token = localStorage.getItem("decodedToken");
    const isAuthorized = localStorage.getItem("isAuthorized") === "true";

    return token !== null && isAuthorized;
  }
};

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/dashboard" element={
            <MsalProvider instance={msalInstance}>
              <Dashboard />
            </MsalProvider>
          } /> */}
            <Route path="/" element={<Dashboard />} />

            <Route path="/forget-password" element={<Forgetpass />} />
            <Route path="/verifyotp" element={<VerifyOtp />} />
            <Route path="/new-password" element={<NewPass />} />
            <Route path="/success-page" element={<PassSuccess />} />
            <Route
              path="/auth"
              element={
                <MsalProvider instance={msalInstance}>
                  <Auth />
                </MsalProvider>
              }
            />
            {/* 
          <Route path="/auth2" element={
            <MsalProvider instance={msalInstance}>
              <Login2 />
            </MsalProvider>
          } /> */}
            <Route path="/auth2" element={<Login2 />} />
            <Route path="/explore-vm" element={<ExploreVM />} />
            <Route path="/vm-management" element={<VM_management />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<Missing />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Suspense>
    </>
  );
};

export default App;

// const App = () => {
//   return (
//     <Suspense fallback={<AppLoading />}>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route
//             path="/assessment/:assessmentName"
//             element={<AssessmentInfo />}
//           />
//           <Route
//             path="/manage-trainings-events"
//             element={<ManageTrainingEvents />}
//           />
//           <Route path="/user-locations" element={<UserLocations />} />
//           <Route
//             path="/live-training-and-tracking"
//             element={<LiveTrainingTracking />}
//           />

//           <Route path="/live-training-view" element={<LiveTrainingView />} />

//           <Route
//             path="/completed-training-and-tracking"
//             element={<CompletedTrainingTracking />}
//           />
//           <Route path="/roles" element={<Roles />} />
//           <Route path="/create-roles" element={<CreateRoles />} />
//           <Route path="/user-management" element={<UserManagement />} />
//           <Route path="/dashboard" element={
//             <MsalProvider instance={msalInstance}>
//               <Dashboard />
//             </MsalProvider>

//           } />
//           <Route path="/manage-teams" element={<Team />} />
//           <Route path="/reports" element={<Reports />} />

//           <Route
//             path="/auth"
//             element={
//               <MsalProvider instance={msalInstance}>
//                 <Auth />
//               </MsalProvider>
//             }
//           />
//           <Route
//             path="/assessments"
//             element={
//               <MsalProvider instance={msalInstance}>
//                 <Assessments />
//               </MsalProvider>
//             }
//           />

//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/404" element={<Missing />} />
//           <Route path="*" element={<Navigate to={"/404"} />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// };

// //socket start code
// // export { socket };

// export default App;
