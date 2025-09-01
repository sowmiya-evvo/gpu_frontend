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
import axios from "axios";

const ExploreVM = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const handleOpenFirst = () => setShowFirst(true);
  const handleCloseFirst = () => setShowFirst(false);

  const handleOpenSecond = () => {
    setShowFirst(false); // Close first modal
    setShowSecond(true); // Open second modal
  };

  const handleCloseSecond = () => setShowSecond(false);

  const Type = [
    { value: "Wellbeing", label: "Wellbeing" },
    { value: "Activity", label: "Activity" },
    { value: "Sleep Quality", label: "Sleep Quality" },
    { value: "Steps", label: "Steps" },
    { value: "Active Hours", label: "Active Hours" },
  ];

  const Country = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Åland Islands", label: "Åland Islands" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
  ];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  interface VM {
    name: string;
    memory: string;
    disk: string;
    vcpu: number;
  }
  const [data, setData] = useState<VM[]>([]);

  useEffect(() => {
    axios
      .get("/api/vm/available_sizes/")
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
              <h5>Explore VM Templates</h5>
              <p>
                Deploy your favorite AI models and applications in seconds with
                our optimized templates
              </p>
            </div>
          </div>

          <div className="row">
            {data && data.length > 0 ? (
              data.map((vm: VM, i: number) => (
                // <div className="row" key={i}>
                <div className="col-xl-3 col-lg-4" key={i}>
                  <div className="card equalHeight">
                    <div className="vmList">
                      <div className="img">
                        <img src="../../assets/images/gpu.jpeg" alt="VM" />
                      </div>
                      <div className="cont">
                        <h4>{vm.name}</h4>
                        <p>Store your data with security</p>

                        <div className="storageDetails">
                          <div className="left">
                            <div className="text">Storage By {vm.memory}</div>
                            <div className="text">Disk {vm.disk}</div>
                            <div className="text">VCPU {vm.vcpu}</div>
                            {/* <span className="tag">$0.11 by GB</span> */}
                          </div>
                          <div className="right">
                            <span className="tag">$0.11 by GB</span>
                          </div>
                        </div>

                        <Button onClick={handleOpenFirst} variant="theme">
                          Deploy <i className="icon-arrow-right1"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                // </div>
              ))
            ) : (
              <p>No VMs available</p>
            )}
          </div>

          {/* <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="card equalHeight">
                <div className="vmList">
                  <div className="img">
                    <img src="../../assets/images/gpu.jpeg" alt="VM" />{" "}
                  </div>
                  <div className="cont">
                    <h4>Fedrated Storage</h4>
                    <p>Store your data with security</p>

                    <div className="storageDetails">
                      <span className="text">Storage by GB</span>
                      <span className="tag">$0.11 by GB</span>
                    </div>

                    <Button onClick={handleOpenFirst} variant="theme">
                      Deploy <i className="icon-arrow-right1"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="card equalHeight">
                <div className="vmList">
                  <div className="img">
                    <img src="../../assets/images/gpu.jpeg" alt="VM" />{" "}
                  </div>
                  <div className="cont">
                    <h4>Fedrated Storage</h4>
                    <p>Store your data with security</p>

                    <div className="storageDetails">
                      <span className="text">Storage by GB</span>
                      <span className="tag">$0.11 by GB</span>
                    </div>

                    <Button onClick={handleOpenFirst} variant="theme">
                      Deploy <i className="icon-arrow-right1"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="card equalHeight">
                <div className="vmList">
                  <div className="img">
                    <img src="../../assets/images/gpu.jpeg" alt="VM" />{" "}
                  </div>
                  <div className="cont">
                    <h4>Fedrated Storage</h4>
                    <p>Store your data with security</p>

                    <div className="storageDetails">
                      <span className="text">Storage by GB</span>
                      <span className="tag">$0.11 by GB</span>
                    </div>

                    <Button onClick={handleOpenFirst} variant="theme">
                      Deploy <i className="icon-arrow-right1"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="card equalHeight">
                <div className="vmList">
                  <div className="img">
                    <img src="../../assets/images/gpu.jpeg" alt="VM" />{" "}
                  </div>
                  <div className="cont">
                    <h4>Fedrated Storage</h4>
                    <p>Store your data with security</p>

                    <div className="storageDetails">
                      <span className="text">Storage by GB</span>
                      <span className="tag">$0.11 by GB</span>
                    </div>

                    <Button onClick={handleOpenFirst} variant="theme">
                      Deploy <i className="icon-arrow-right1"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <Footer />
        </div>
      </div>

      <Modal
        className="mw-800"
        show={showFirst}
        onHide={handleCloseFirst}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Deploy VM</h4>
          </Modal.Title>
        </Modal.Header>
        <div className="vmBlockWrap">
          <div className="img">
            <img src="../../assets/images/gpu.jpeg" alt="" />
          </div>
          <div className="cont">
            <h4>Fedrated Node</h4>
            <p>Powerfull GPU VMs for paws-itively fast computing!</p>
            <div className="storageDetails mt-2 mb-0">
              <span className="text">Storage by GB</span>
              <span className="tag">$0.11 by GB</span>
            </div>
          </div>
        </div>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Email</label>
                <input type="text" name="teamTitle" placeholder="Enter email" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="teamTitle"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Billing Address</label>
            <input type="text" name="teamTitle" placeholder="Enter address" />
          </div>

          <div className="form-group">
            <label>Country</label>
            <div className="custom-select-wrap">
              <Select
                className="selectpicker z-index-99"
                placeholder="Select"
                options={Country}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address 1</label>
            <input type="text" name="teamTitle" placeholder="Enter address" />
          </div>

          <div className="form-group">
            <label>Address 2</label>
            <input type="text" name="teamTitle" placeholder="Enter address" />
          </div>

          <h5 className="tColor">Payment</h5>

          <div className="paymentBgWrap p-4">
            <div className="form-group">
              <label className="form-label mb-2">Card Number</label>
              <div className="cardNumberField">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Enter VM Name"
                />
                <div className="cardImgs">
                  <div className="img">
                    <svg
                      viewBox="0 0 24 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      focusable="false"
                      className="p-Logo p-Logo--md p-CardBrandIcon"
                    >
                      <g>
                        <rect
                          stroke="#DDD"
                          fill="#FFF"
                          x=".25"
                          y=".25"
                          width="23.5"
                          height="15.5"
                          rx="2"
                        ></rect>
                        <path
                          d="M2.788 5.914A7.201 7.201 0 0 0 1 5.237l.028-.125h2.737c.371.013.672.125.77.519l.595 2.836.182.854 1.666-4.21h1.799l-2.674 6.167H4.304L2.788 5.914Zm7.312 5.37H8.399l1.064-6.172h1.7L10.1 11.284Zm6.167-6.021-.232 1.333-.153-.066a3.054 3.054 0 0 0-1.268-.236c-.671 0-.972.269-.98.531 0 .29.365.48.96.762.98.44 1.435.979 1.428 1.681-.014 1.28-1.176 2.108-2.96 2.108-.764-.007-1.5-.158-1.898-.328l.238-1.386.224.099c.553.23.917.328 1.596.328.49 0 1.015-.19 1.022-.604 0-.27-.224-.466-.882-.769-.644-.295-1.505-.788-1.491-1.674C11.878 5.84 13.06 5 14.74 5c.658 0 1.19.138 1.526.263Zm2.26 3.834h1.415c-.07-.308-.392-1.786-.392-1.786l-.12-.531c-.083.23-.23.604-.223.59l-.68 1.727Zm2.1-3.985L22 11.284h-1.575s-.154-.71-.203-.926h-2.184l-.357.926h-1.785l2.527-5.66c.175-.4.483-.512.889-.512h1.316Z"
                          fill="#1434CB"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="img">
                    <svg
                      viewBox="0 0 24 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      focusable="false"
                      className="p-Logo p-Logo--md p-CardBrandIcon"
                    >
                      <rect fill="#252525" height="16" rx="2" width="24"></rect>
                      <circle cx="9" cy="8" fill="#eb001b" r="5"></circle>
                      <circle cx="15" cy="8" fill="#f79e1b" r="5"></circle>
                      <path
                        d="M12 4c1.214.912 2 2.364 2 4s-.786 3.088-2 4c-1.214-.912-2-2.364-2-4s.786-3.088 2-4z"
                        fill="#ff5f00"
                      ></path>
                    </svg>
                  </div>
                  <div className="img">
                    <svg
                      viewBox="0 0 24 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      focusable="false"
                      className="p-Logo p-Logo--md p-CardBrandIcon"
                    >
                      <rect fill="#016fd0" height="16" rx="2" width="24"></rect>
                      <path
                        d="M13.764 13.394V7.692l10.148.01v1.574l-1.173 1.254 1.173 1.265v1.608h-1.873l-.995-1.098-.988 1.102z"
                        fill="#fffffe"
                      ></path>
                      <path
                        d="M14.442 12.769v-4.45h3.772v1.026h-2.55v.695h2.49v1.008h-2.49v.684h2.55v1.037z"
                        fill="#016fd0"
                      ></path>
                      <path
                        d="m18.195 12.769 2.088-2.227-2.088-2.222h1.616l1.275 1.41 1.28-1.41h1.546v.035l-2.043 2.187 2.043 2.164v.063H22.35l-1.298-1.424-1.285 1.424z"
                        fill="#016fd0"
                      ></path>
                      <path
                        d="M14.237 2.632h2.446l.86 1.95v-1.95h3.02l.52 1.462.523-1.462h2.306v5.701H11.725z"
                        fill="#fffffe"
                      ></path>
                      <g fill="#016fd0">
                        <path d="m14.7 3.251-1.974 4.446h1.354l.373-.89h2.018l.372.89h1.387L16.265 3.25zm.17 2.558.592-1.415.592 1.415z"></path>
                        <path d="M18.212 7.696V3.25l1.903.006.98 2.733.985-2.74h1.832v4.446l-1.179.01V4.653L21.62 7.696h-1.075l-1.136-3.054v3.054z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Expiry date</label>
                  <input type="text" placeholder="MM / YY" />
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Security code</label>
                  <div className="cardNumberField securityImg">
                    <input type="text" placeholder="CVC" />
                    <div className="cardImgs">
                      <div className="img">
                        <svg
                          className="currentColor"
                          width="30"
                          height="20"
                          viewBox="0 0 30 20"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="var(--colorIconCardCvc)"
                          role="img"
                          aria-labelledby="cvcDesc"
                        >
                          <g opacity="0.74">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M25.2061 0.00488281C27.3194 0.112115 29 1.85996 29 4V11.3291C28.5428 11.0304 28.0336 10.8304 27.5 10.7188V8H1.5V16C1.5 17.3807 2.61929 18.5 4 18.5H10.1104V20H4L3.79395 19.9951C1.7488 19.8913 0.108652 18.2512 0.00488281 16.2061L0 16V4C0 1.85996 1.68056 0.112115 3.79395 0.00488281L4 0H25L25.2061 0.00488281ZM4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V5H27.5V4C27.5 2.61929 26.3807 1.5 25 1.5H4Z"
                            ></path>
                            <path d="M27.5 12.7988C28.3058 13.1128 28.7725 13.7946 28.7725 14.6406C28.7722 15.4002 28.2721 15.9399 27.6523 16.1699C28.1601 16.3319 28.6072 16.6732 28.8086 17.2207C28.3597 18.6222 27.1605 19.6862 25.6826 19.9404C24.8389 19.7707 24.1662 19.2842 23.834 18.5H25C25.0914 18.5 25.1816 18.4939 25.2705 18.4844C25.5434 18.7862 25.9284 18.9501 26.3623 18.9502C27.142 18.9501 27.6922 18.5297 27.6924 17.79C27.6923 17.4212 27.5473 17.1544 27.2998 16.9795C27.4281 16.6786 27.5 16.3478 27.5 16V15.0527C27.5397 14.9481 27.5625 14.8309 27.5625 14.7002C27.5625 14.5657 27.5399 14.4422 27.5 14.3311V12.7988Z"></path>
                            <path d="M15.2207 18.5V18.8301H16.8799V19.9004H12.1104V18.8301H13.9902V18.5H15.2207Z"></path>
                            <path d="M19.9307 18.5L19.5762 18.7803H22.8369V19.9004H17.8164V18.8604L18.2549 18.5H19.9307Z"></path>
                          </g>
                          <path d="M26.3822 20.01C24.9722 20.01 23.8522 19.25 23.6422 17.81L24.8722 17.58C24.9922 18.45 25.6022 18.95 26.3622 18.95C27.1422 18.95 27.6922 18.53 27.6922 17.79C27.6922 17.05 27.1122 16.72 26.2822 16.72H25.5722V15.67H26.3022C27.0622 15.67 27.5622 15.34 27.5622 14.7C27.5622 14.07 27.1022 13.68 26.3922 13.68C25.6422 13.68 25.1322 14.18 24.9822 14.92L23.8122 14.76C24.0022 13.55 24.9822 12.61 26.4322 12.61C27.8822 12.61 28.7722 13.47 28.7722 14.64C28.7722 15.4 28.2722 15.94 27.6522 16.17C28.3422 16.39 28.9222 16.94 28.9222 17.89C28.9222 19.04 27.9522 20.01 26.3822 20.01Z"></path>
                          <path d="M17.8161 18.86L19.6161 17.38C20.5961 16.58 21.4761 15.87 21.4761 14.97C21.4761 14.23 21.0161 13.7 20.2561 13.7C19.5061 13.7 19.0161 14.29 19.0161 15C19.0161 15.23 19.0561 15.46 19.1361 15.68H17.9461C17.8461 15.39 17.8161 15.2 17.8161 14.93C17.8161 13.58 18.9261 12.61 20.2861 12.61C21.7861 12.61 22.7461 13.54 22.7461 14.89C22.7461 16.16 21.7861 17.03 20.7761 17.83L19.5761 18.78H22.8361V19.9H17.8161V18.86Z"></path>
                          <path d="M14.25 12.67H15.22V18.83H16.88V19.9H12.11V18.83H13.99V14.92H12.15V13.99L12.88 13.93C13.78 13.86 14.18 13.58 14.25 12.67Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btnWrap">
            <Button variant="outline-primary" onClick={handleCloseFirst}>
              Close
            </Button>
            <Button variant="dark" onClick={handleOpenSecond}>
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        className="mw-630"
        show={showSecond}
        onHide={handleCloseSecond}
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Second Modal</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="successBlock">
            <div className="ico">
              <i className="icon-success"></i>
            </div>
            <div className="cont">
              <h4>Success!</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been{" "}
              </p>
            </div>
          </div>

          <div className="btnWrap mt-4 pt-2 mb-3">
            <Button variant="outline-primary" onClick={handleCloseSecond}>
              Close
            </Button>
            <Button variant="dark" onClick={handleCloseSecond}>
              Okay
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExploreVM;
