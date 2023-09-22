import React, { useEffect } from 'react'
import './orderDetail.css'


import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import {useLocation} from 'react-router-dom'

const OrderDetail = () => {
  const [user,setUser]=useState({})
  const [carDetails,setCarDetails]=useState({})
  const [carRegion,setCarRegion]=useState({})
  const [estimates,setEstimates]=useState([])
  const [status,setStatus]=useState()
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [getstatus,setGetStatus]=useState([]);


  const {state}=useLocation()
   console.log(state.state)
useEffect(() => {
    setStatus(state.state.orderStatus)
}, [])

  const handleChange=()=>{
    setbuttonLoading(true)
    fetch(`https://mobile-store-api.vercel.app/api/v1/admin/order/${state.state._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authtoken}`,
      },
      body:JSON.stringify({status:status}),
     
    })
    .then((resp) => {
      resp.json().then((res) => {
        setbuttonLoading(false)

          if (res.success == true) {
          
            toast.success('Updated Successfully');
          }
   
          else {
            toast.error('SomeTHing went wronge');
          }  
        
      });
    })
  }


  return (
    <>
    <Toaster />
      <div className="card-body d-flex flex-column p-0">
        <div className="row mainqui">
        <div className="col-lg-8 col-xxl-8 ">
          <div className="row m-0 rounded-top" style={{backgroundColor:"black"}}>
              <div className="col px-8 py-6 mr-8 d-flex justify-content-between">
                <div className="font-size-h5 font-weight-bolder text-light ">
                 Order Detail
                </div>
                <div className="font-size-h5 font-weight-bolder text-light ">
                
                </div>
              </div>
            </div>

            {/* ////car inquire session//////////////////////////////////// */}



              <>
                <div className="card-spacer bg-white card-rounded flex-grow-1">
                <div className="row m-0">
            
            <div className="col px-8 py-6">
              <div className="font-size-sm text-muted font-weight-bold">
             Phone Name:
              </div>
              <div className="font-size-p font-weight-bolder mt-3">
              {state.state.product.name}
              </div>
            </div>
            <div className="col px-8 py-6 mr-8">
              <div className="font-size-sm text-muted font-weight-bold">
              Colour:
              </div>
              <div className="font-size-p font-weight-bolder mt-3">
              {state.state.orderItems.color}
              </div>
            </div>
          </div>

                  {/* <div className="row m-0">
                    <div className="col px-8 py-6 mr-8">
                    <div className="font-size-sm text-muted font-weight-bold">Topic:</div>
                      <div className="font-size-h4 font-weight-bolder">
                       fsfsdf
                      </div>
                    </div>
                   
                  </div> */}

                  

                  <div className="row m-0">
            
                    <div className="col px-8 py-6">
                      <div className="font-size-sm text-muted font-weight-bold">
                      Quantity:
                      </div>
                      <div className="font-size-p font-weight-bolder mt-3">
                      {state.state.orderItems.quantity}
                      </div>
                    </div>
                    <div className="col px-8 py-6 mr-8">
                      <div className="font-size-sm text-muted font-weight-bold">
                     Total Price:
                      </div>
                      <div className="font-size-p font-weight-bolder mt-3">
                      {state.state.orderItems.totalPrice}
                      </div>
                    </div>
                  </div>
                  {/* end::row */}
                  {/* begin::row */}
                  <div className="row m-0">
                 
                    <div className="col px-8 py-6">
                      <div className="font-size-sm text-muted font-weight-bold">
                    Date
                      </div>
                      <div className="font-size-p font-weight-bolder mt-3">
                    {state.state.date}
                      </div>
                    </div>
                    <div className="col px-8 py-6 mr-8">
                    <div className="font-size-sm text-muted font-weight-bold">Order Status:</div>
                      <div className="font-size-p font-weight-bolder mt-3">
                         {state.state.orderStatus}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                  <div className="col-md-12 px-8 py-6 mr-8">
                    <div className="font-size-sm text-muted font-weight-bold">Phone Description:</div>
                      <div className="font-size-p font-weight-bolder mt-3">
                         {state.state.product.description}
                      </div>
                    </div>
                  </div>
                  {/* end::row */}

          </div>
          </>
                </div>
          <div className="col-lg-4 col-xxl-4 ">
                <div className="row userCardquri">
                  <div className="col ">
                    <div
                    
                      className="d-flex rounded-top"
                      style={{ height: "65px", minHeight: "65px",background:"black" }}
                    >
                            <div className="d-flex align-items-center">
                        <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                        </div>
                        <div>
                          <div
                            className="font-weight-bolder font-size-h5 text-light"
                          >
                         Shipping Details
                        
                          </div>
                        </div>
                      </div>
            
                    </div>
         
                    <div className="card-spacer bg-white rounded-bottom flex-grow-1" style={{minHeight:"200px"}}>
                      <div className="m-0">
               
                      <>
                        <div className="col px-8 py-0 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                           User Name
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                        {state.state.shippingInfo.userName}
                          </div>
                        </div>
                        <div className="col px-8 py-3 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                            Phone Number
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                          {state.state.shippingInfo.phone}
                          </div>
                        </div>
                        <div className="col px-8 py-2 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                          Province
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                          {state.state.shippingInfo.province}
                          </div>
                        </div>
                        <div className="col px-8 py-2 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                          City
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                          {state.state.shippingInfo.city}
                          </div>
                        </div>
                        <div className="col px-8 py-2 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                          Zip Code
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                          {state.state.shippingInfo.zip}
                          </div>
                        </div>
                        <div className="col px-8 py-2 rolequie">
                          <div className="font-size-sm text-muted font-weight-bold">
                          Address
                          </div>
                          <div className="font-size-h5 font-weight-bolder">
                          {state.state.shippingInfo.address}
                          </div>
                        </div>
                      </>
                  
                      </div>
                    </div>
                  </div>
                </div>
          <div className=' status-card'>
             <div className='headingstatus'>
               <h4>Update Status</h4>
             </div>
             <div className='updatestatusmain'>
             <select
             onChange={(e)=>setStatus(e.target.value)}
              style={{ height: 38 }}
              className=""
              value={status}
              aria-label="Default select example"
            >
               
                <option value='Processing'>
                Processing
                </option>
                <option value='Delivered'>
                Delivered
                </option>
                <option value='Completed'>
                Completed
                </option>
              
        
             
            </select>
            <button disabled={buttonLoading} onClick={handleChange} className='updateStatusButton'>Update</button>
             </div>
          </div>
            
              </div>
        </div>


      </div>
    </>
  )
}

export default OrderDetail