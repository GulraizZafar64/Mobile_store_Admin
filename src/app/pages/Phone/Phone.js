import React, { useCallback, useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import './phone.css'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import {useHistory} from 'react-router-dom'
import * as columnFormatters from "../../modules/ECommerce/pages/customers/customers-table/column-formatters";
import * as uiHelpers from "../../../app/modules/ECommerce/pages/customers/CustomersUIHelpers";
import { Pagination } from "../../../../src/_metronic/_partials/controls";
import LinearProgress from "@material-ui/core/LinearProgress";
import DeleteModal from "../../Components/DeleteModal";
export function Phone() {
  const authtoken = localStorage.getItem("userToken");

  const [addModal, setaddModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editItem, setEditItem] = useState({});
const [product,setProduct]=useState([])
  const [searchCode, setSearchCode] = useState("");
  const history=useHistory()
  const [searchBrand, setSearchBrand] = useState("");
  ////for pagination
  const initialFilter = {
    pageNumber: 1,
    pageSize: 10,
  };

  const [queryParams, setQueryParamsBase] = useState(initialFilter);




  // const columns = [
  //   {
  //     dataField: "code",
  //     text: "Code",
  //   },
  //   {
  //     dataField: "name",
  //     text: "Name",
  //   },
  //   {
  //     dataField: "action",
  //     text: "Actions",
  //     formatter: columnFormatters.ActionsColumnFormatter,
  //     formatExtraData: {
  //       openEditCustomerDialog: (item) => openEdit(item),
  //       openDeleteCustomerDialog: (id) => {
  //         setdeleteModal(true);
  //         setSelectedId(id);
  //       },
  //     },
  //     classes: "text-right pr-0",
  //     headerClasses: "text-right pr-3",
  //     style: {
  //       minWidth: "100px",
  //     },
  //   },
  // ];

  const openEdit = (item) => {
    setEditItem(item);
    seteditModal(true);
    setaddModal(true);
  };
  const options = {
    custom: true,
    totalSize: brands.length,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: queryParams.pageSize,
    page: queryParams.pageNumber,
  };

  const onPaginationSelectChange = () => {
    setQueryParamsBase({
      pageNumber: 1,
    });
  };

  const updatingQueryParams = (page) => {
    console.log(page);
    console.log("this is chus2");
    setQueryParamsBase({
      pageNumber: page,
    });
  };
useEffect(() => {
  getPhones()
}, [])

const getPhones=()=>{
  fetch(`https://mobile-store-km17iiqc8-gulraizzafar64.vercel.app/api/v1/getProduct`, {
    method: 'GET',
  }).then(res => res.json()
    .then(data => {
      if(data.success){
        setProduct(data.products)
      }
     console.log(data)
    })

  ).catch(err => {
   console.log(err)
  })
}


  return (
    <>
      {loading ? <LinearProgress /> : null}
      <Card>
        <>
          <CardHeader title="Phone List">
            <CardHeaderToolbar>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() => {
                 history.push('/addPhone')
                }}
              >
                New Phone
              </button>
            </CardHeaderToolbar>
          </CardHeader>
      
          <CardBody>
            <div className="row">
              {
                product.length>0?
               product.map((item)=>(
                <div className="col-md-4">
                <div className="phoneCard">
                  <div className="phoneImageconainer">
                  <img src={item.images[0].url} alt="image"/>
                  </div>
                 <div className="contentofphone">
                 <h3 className="">{item.name}</h3>
                  <p className="" style={{height:"30px"}}>{item.description.length>90?item.description.slice(0,90)+'....': item.description}</p>
                  <div className="d-flex justify-content-between">
                      <b><h5>Company</h5></b>
                      <b><h5>{item?.company}</h5></b>
                  </div>
                  <div className="d-flex justify-content-between">
                      <b><h5>Price</h5></b>
                      <b><h5>{item.price}Rs</h5></b>
                  </div>
                  <div className="d-flex justify-content-between">
                      <b><h5>Stock</h5></b>
                      <b><h5>{item.stock}</h5></b>
                  </div>
                  <div className="editVutton">
                  <button onClick={()=>{
                    history.push('/editPhone', item);
                  }}>Edit</button>
                  </div>
                  <div className="deleteButton">
                  <button onClick={()=>{
                    setSelectedId(item._id)
                    setdeleteModal(true)
                  }}>Delete</button>
                  </div>
                 
                 </div>
                </div>
            </div>
               ))
               
                :''
              }
            </div>
            {/* <PaginationProvider pagination={paginationFactory(options)}>
              {({ paginationProps, paginationTableProps }) => {
                return (
                  <>
            
                    <Pagination
                      updatingQueryParams={updatingQueryParams}
                      onPaginationSelectChange={onPaginationSelectChange}
                      isLoading={loading}
                      paginationProps={paginationProps}
                    >
                      <BootstrapTable
                        wrapperClasses="table-responsive"
                        bordered={false}
                        classes="table table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        keyField="id"
                        data={brands}
                        columns={columns}
                        defaultSorted={uiHelpers.defaultSorted}
                        {...paginationTableProps}
                      ></BootstrapTable>
                    </Pagination>
                  </>
                );
              }}
            </PaginationProvider> */}
          </CardBody>
        </>
        <DeleteModal show={deleteModal} close={()=>setdeleteModal(false)} title={"Delete Phone"} description={"Are You Sure You Want To Delete"} url={`https://mobile-store-km17iiqc8-gulraizzafar64.vercel.app/api/v1/product/${selectedId}`} reload={getPhones}/>
      </Card>
   
    
    </>
  );
}
