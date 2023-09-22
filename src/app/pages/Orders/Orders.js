import React, { useCallback, useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
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
export function Orders() {

  const [loading, setloading] = useState(false);
const [product,setProduct]=useState([])
  const history=useHistory()
  ////for pagination
  const initialFilter = {
    pageNumber: 1,
    pageSize: 10,
  };

  const [queryParams, setQueryParamsBase] = useState(initialFilter);




  const columns = [
    {
      dataField: "product.name",
      text: "Name",
    },
    {
      dataField: "orderItems.quantity",
      text: "Quantity",
    },
    {
      dataField: "orderItems.color",
      text: "Colour",
    },
    {
      dataField: "orderItems.totalPrice",
      text: "Price",
    },
    {
      dataField: "shippingInfo.userName",
      text: "User Name",
    },
    {
      dataField: "shippingInfo.phone",
      text: "Phone No",
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "orderStatus",
      text: "Status",
      sort: true,
      formatter: (row, cell) => (
        <span
          className={`label label-lg label-light-${getClassOrder(
            row
          )} label-inline`}
        >
          {row}
        </span>
      ),
      // sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "View",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openView: (item) => history.push('/orderDetail', {state:item}),
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];


  const options = {
    custom: true,
    totalSize: product.length,
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
  let url="https://mobile-store-api.vercel.app/api/v1/admin/orders"
    setloading(true)
  fetch(`${url}`, {
    method: 'GET',
  }).then(res => res.json()
    .then(data => {
        setloading(false)
      if(data.success){
        let arr=data.orders.map((item)=>{
          item['date']=new Date(item.createdAt).toISOString().split('T')[0]
          return item
        })
        setProduct(arr.reverse())

      }
     console.log(data)
    })

  ).catch(err => {
    setloading(false)
   console.log(err)
  })
}

const getClassOrder = (row) => {
  let classname = "";
  if (row == "Processing") {
    classname = "info";
  } else if (row == "Delivered") {
    classname = "primary";
  }else {
    classname = "success";
  }

  return classname;
};
  return (
    <>
      {loading ? <LinearProgress /> : null}
      <Card>
        <>
          <CardHeader title="Order List">
            <CardHeaderToolbar>
      
            </CardHeaderToolbar>
          </CardHeader>
      
          <CardBody>
        
            <PaginationProvider pagination={paginationFactory(options)}>
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
                        data={product}
                        columns={columns}
                        defaultSorted={uiHelpers.defaultSorted}
                        {...paginationTableProps}
                      ></BootstrapTable>
                    </Pagination>
                  </>
                );
              }}
            </PaginationProvider>
          </CardBody>
        </>

      </Card>
   
    
    </>
  );
}
