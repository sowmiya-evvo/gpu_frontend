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





const options = [
  { value: "Dashboard", label: "Dashboard" },
  { value: "Monitoring & Alerts", label: "Monitoring & Alerts" },
  { value: "Health Data", label: "Health Data" },
];

const Dashboard = () => {
  



  

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

              <div className="pageTitleWrap">
                  <div className="pageTitle">
                    <h5>Daashboard</h5>
                    <p>View your current activity summary</p>
                  </div>
                  <div className="actionWrap">
                    <DatePickerComponent />
                    <Button variant="secondary">Filter</Button>
                  </div>
              </div>


              <div className="row">
                <div className="col-lg-4">
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="revenueTitle">Revenue</div>
                      <div className="revenueContBlock">
                        <div className="revenueCont">
                          <h4>$21,827.13</h4>
                          <p>vs. 3 months prior to 20 Jan</p>
                        </div>
                        <span className="badge badge-success"><i className="icon-arrow-down-long arrowUp me-1"></i>11.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="revenueTitle">Orders</div>
                      <div className="revenueContBlock">
                        <div className="revenueCont">
                          <h4>1,758</h4>
                          <p>vs. 3 months prior to 20 Jan</p>
                        </div>
                        <span className="badge badge-danger"><i className="icon-arrow-down-long  me-1"></i>11.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="revenueTitle">Purchases</div>
                      <div className="revenueContBlock">
                        <div className="revenueCont">
                          <h4>$7,249.31</h4>
                          <p>vs. 3 months prior to 20 Jan</p>
                        </div>
                        <span className="badge badge-success"><i className="icon-arrow-down-long arrowUp me-1"></i>11.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-lg-8">
                  <div className="card equalHeight">
                    <div className="card-header">
                      <div className="card-title">
                        <h4>Sales Report</h4>
                      </div>
                      <div className="actionWrap">
                        <Button variant="secondary">Export Report</Button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="salesReport">
                        <LineChart />
                      </div>
                    </div>
                  </div>
               </div>

               <div className="col-lg-4">
                  <div className="card equalHeight">
                    <div className="card-header">
                      <div className="card-title">
                        <h4>Categories</h4>
                      </div>
                      <div className="actionWrap"></div>
                    </div>
                    <div className="card-body">
                      <div className="categoryReport mt-4">
                        <CategoryChart />
                        <div className="categoryReportCont">
                          <div className="value">284</div>
                          <div className="label">Product Sold</div>
                        </div>
                      </div>

                      <div className="categoryChartLabel">
                        <span className="Darkblue">Devices</span>
                        <span className="blue">Watches</span>
                        <span className="green">Bags</span>
                        <span className="orange">Shoes</span>
                      </div>
                    </div>
                  </div>
               </div>
              </div>



              <div className="row">
                <div className="col-lg-8">
                  <div className="card equalHeight">
                    <div className="card-header">
                      <div className="card-title">
                        <h4>Latest Orders</h4>
                      </div>
                      <div className="actionWrap">
                        <Button variant="outline-secondary">View Orders</Button>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                          <Table>
                              <thead>
                                <tr>
                                  <th>Order</th>
                                  <th>Customer</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Profile Progress</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>#95954</td>
                                  <td>
                                      <span className="dotTag green">Paid</span>
                                  </td>
                                  <td>10/08/2022	</td>
                                  <td>Ron Vargas	</td>
                                  <td>$168.00	</td>
                                </tr>
                                <tr>
                                  <td>#95954</td>
                                  <td>
                                      <span className="dotTag orange">Pending</span>
                                  </td>
                                  <td>10/08/2022	</td>
                                  <td>Ron Vargas	</td>
                                  <td>$168.00	</td>
                                </tr>

                                <tr>
                                  <td>#95954</td>
                                  <td>
                                      <span className="dotTag red">Failed</span>
                                  </td>
                                  <td>10/08/2022	</td>
                                  <td>Ron Vargas	</td>
                                  <td>$168.00	</td>
                                </tr>
                                
                              </tbody>
                            </Table>
                      </div>
                    </div>
                  </div>
               </div>

               
              </div>
              

              

              <Footer />
            </div>
          </div>
        

      

     



      

    </>
  );
};

export default Dashboard;