import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Modal, Button, Table } from "react-bootstrap";
import SideNavBar from "../../components/Sidebar-left/sideBar";
import TopNav from "../../components/top-nav";
import Footer from "../../components/footer";
import Select from "react-select";
import DatePickerComponent from "../../components/datepicker";
import LineChart from "../../components/chart";
import CategoryChart from "../../components/chart/dashboard_category_chart";
import GPU_performance from "../../components/chart/GPU_performance";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const options = [
  { value: "Dashboard", label: "Dashboard" },
  { value: "Monitoring & Alerts", label: "Monitoring & Alerts" },
  { value: "Health Data", label: "Health Data" },
];

const VM_management = () => {
  interface VML {
    id: string;
    name: string;
    instance_type: string;
    memory: string;
    disk: string;
    vcpu: string;
  }

  const [data, setData] = useState<VML[]>([]);
  const [start, setStart] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/vm/")
      .then((res) => {
        console.log("Response Data:", res.data); // 👈 Add this
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        // localStorage.removeItem("token");
        // navigate("/login");
      });
  }, []);

  const handleStart = (id: string) => {
    axios
      .get(`/api/vm/${id}/start/`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Response Data:", res.status);
          toast.success("Started Successfully");
        }
        console.log("Response Data:", res.status); // 👈 Add this
        setStart(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log("Response 400:", err.response.data);
            toast.warning("VM is already running"); // 👈 handle 400 specifically
          } else {
            console.log("Error:", err.response.status, err.response.data);
            toast.error("Unable to start VM");
          }
        } else {
          console.error("Network/Other Error:", err);
          toast.error("Something went wrong");
        }
      });
  };

  const handleStop = (id: string) => {
    axios
      .get(`/api/vm/${id}/shutdown/`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Response Data:", res.status);
          toast.success("Stopped Successfully");
        }
        console.log("Response Data:", res.status); // 👈 Add this
        setStart(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log("Response 400:", err.response.data);
            toast.warning("VM is already stopped"); // 👈 handle 400 specifically
          } else {
            console.log("Error:", err.response.status, err.response.data);
            toast.error("Unable to stop VM");
          }
        } else {
          console.error("Network/Other Error:", err);
          toast.error("Something went wrong");
        }
      });
  };

  const handleReboot = (id: string) => {
    axios
      .get(`/api/vm/${id}/reboot/`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Response Data:", res.status);
          toast.success("Rebooted Successfully");
        }
        console.log("Response Data:", res.status); // 👈 Add this
        setStart(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to reboot");
        // localStorage.removeItem("token");
        // navigate("/login");
      });
  };

  

  return (
    <>
      <TopNav />
      {/* {pageLoader === 1 && (
        <div className="pageLoader">
          <span className="spinner"></span>
        </div>
      )} */}

      <div className="d-flex align-items-stretch">
        <SideNavBar />
        <div className="page-content pb-4">
          <div className="pageTitleWrap mb-4">
            <div className="pageTitle">
              <h5>VM Management</h5>
              <p>
                Deploy your favorite AI models and applications in seconds with
                our optimized templates
              </p>
            </div>
          </div>

          {data && data.length > 0 ? (
            data.map((vm: VML, i: number) => (
              <div className="card">
                <div className="selectedVmBlock">
                  <div className="vmBlockWrap">
                    <div className="img">
                      <img src="../../assets/images/gpu.jpeg" alt="" />
                    </div>
                    <div className="cont">
                      <h4>Fedrated Node</h4>
                      <p>Powerfull GPU VMs for paws-itively fast computing!</p>
                      <div className="storageDetails mt-2 mb-0">
                        <span className="text">Large VM</span>
                        <span className="tag">$0.04 by VM Usage</span>
                      </div>
                    </div>
                  </div>
                  <div className="btn-Block">
                    <button
                      className="btn btn-state playBtnActive"
                      onClick={() => handleStart(vm.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        ></path>
                      </svg>
                      Start
                    </button>
                    {/* <button className="btn btn-state">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="20"
                        height="20"
                        className="mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        ></path>
                      </svg>
                      Pause
                    </button> */}
                    <button
                      className="btn btn-state"
                      onClick={() => handleStop(vm.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="20"
                        height="20"
                        className="mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                        ></path>
                      </svg>
                      Stop
                    </button>
                    <button
                      className="btn btn-state"
                      onClick={() => handleReboot(vm.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="20"
                        height="20"
                        className="mr-2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {/* <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 12a9 9 0 1 1-3-6.7"
                        ></path>
                        <polyline points="21 3 21 12 12 12" /> */}
                        <path d="M21 12a9 9 0 1 1-3-7.1" />
                        <polyline points="21 3 21 9 15 9" />
                      </svg>
                      Reboot
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="br-bottom pb-4">
                    <div className="row">
                      <div className="col-lg-6 left-col">
                        <h4 className="fw-600 mb-2">Usage</h4>
                        <p className="paragraphSM">
                          Keep an eye on your daily spend with real-time
                          insights.
                        </p>

                        <div className="row">
                          <div className="col-6">
                            <div className="text-wrap  mt-5">
                              <label className="sizeParagraph colorPt">
                                Rolling{" "}
                              </label>
                              <h4 className="fw-600 mt-2">
                                $0.00/ <small>day</small>
                              </h4>

                              <div className="mt-4">
                                <p className="sizeParagraph colorPt mb-0">
                                  $1.00
                                </p>
                                <p className="sizeParagraph colorPt mb-0">
                                  $0.80
                                </p>
                                <p className="sizeParagraph colorPt mb-0">
                                  $0.60
                                </p>
                                <p className="sizeParagraph colorPt mb-0">
                                  $0.40
                                </p>
                                <p className="sizeParagraph colorPt mb-0">
                                  $0.20
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="text-wrap  mt-5">
                              <label className="sizeParagraph colorPt">
                                Current Spend Rate{" "}
                              </label>
                              <h4 className="fw-600 mt-2  ">
                                $0.00/ <small>hr</small>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 mt-4 mt-lg-0">
                        <h4 className="fw-600 mb-2">Resources</h4>
                        <p className="paragraphSM">
                          Monitor your GPU, vCPU, storage, and endpoint usage.
                        </p>

                        <div className="row">
                          <div className="col-6">
                            <div className="text-wrap  mt-4 pb-4 br-bottom">
                              <label className="sizeParagraph colorPt">
                                GPUS{" "}
                              </label>
                              <h4 className="fw-600 mt-2 ">0</h4>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="text-wrap  mt-4 pb-4 br-bottom">
                              <label className="sizeParagraph colorPt">
                                VCPU{" "}
                              </label>
                              <h4 className="fw-600 mt-2 ">{vm.vcpu}</h4>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                            <div className="text-wrap  mt-4 ">
                              <label className="sizeParagraph colorPt">
                                Storage{" "}
                              </label>
                              <h4 className="fw-600 mt-2 ">{vm.memory} GB</h4>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="text-wrap  mt-4 ">
                              <label className="sizeParagraph colorPt">
                                Endpoints{" "}
                              </label>
                              <h4 className="fw-600 mt-2 ">0</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="fw-600 mt-4">GPU Live Performance</h4>

                  <div className="GPULiveperfomanceChart">
                    <GPU_performance />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No VMs available</p>
          )}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default VM_management;
