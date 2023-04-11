import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import TableFooter from "./TableFooter";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let index = 1; index <= num; index++) {
    range.push(index);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

async function getDataById(type, id) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/`;
  if (type === 'order') {
    url = url + type + "/by-user/" + id;
  }
  let data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return data;
}

async function getOrderDetailByOrderCode(orderCode) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/order-detail/by-code/?code=${orderCode}`;
  let data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return data;
}

async function getUserInfoById(userId) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/user/info/${userId}`;
  let data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return data;
}

async function deleteData(id) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/address/delete/${id}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(data => data.json())
}

const Table = ({
  columns = null,
  hover = true,
  striped = true,
  rowsPerPage = 3,
  type = null,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let [message, setMessage] = useState("");
  let [currentData, setCurrentData] = useState([]);
  let [tableRange, setTableRange] = useState([]);
  let [slice, setSlice] = useState([]);
  let handleData = async () => {
    let userId = sessionStorage.getItem('userId');
    if (type === 'address') {
      let response = await getUserInfoById(userId);
      setCurrentData(response.address);
    }
    if (type === 'order') {
      let response = await getDataById(type, userId);
      setCurrentData(response);
    }
  }
  useEffect(() => {
    handleData();
  }, [])
  useEffect(() => {
    const range = calculateRange(currentData, rowsPerPage);
    setTableRange([...range]);
    const slice = sliceData(currentData, page, rowsPerPage);
    setSlice([...slice]);
  }, [setTableRange, page, setSlice, currentData]);
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };
  const handleOrderCode = async (orderCode) => {
    let response = await getOrderDetailByOrderCode(orderCode);
    let data = JSON.stringify(response);
    sessionStorage.setItem('orderdetail', data);
    navigate('/order-detail/?code=' + orderCode);
  }
  const handleDeleteData = async (id) => {
    let response = await deleteData(id);
    if (response.message === 'Deleted') {
      let newData = [];
      currentData.forEach(element => {
        if (element.id !== id) {
          newData.push(element);
        }
      });
      setCurrentData(newData);
      sessionStorage.setItem('address', 'updated');
      setMessage('deleted-address');
    }
    else {
      setMessage('error-deleted-address');
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns &&
              columns.map((head) => (
                <th>{getCaps(head.header, head.field)}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {slice &&
            slice.map((row) => (
              <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                {columns.map((col) => (
                  <td>{row[col.field]}</td>
                ))}
                {type === 'order' && (
                  <td>
                    <Box className="box payment box-address-delete">
                      <IconButton
                        className="box payment button-address-delete"
                        onClick={(e) => handleOrderCode(row.orderCode)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Box>
                  </td>
                )}
                {type === 'address' && (
                  <td>
                    <Box className="box payment box-address-delete">
                      <IconButton
                        className="box payment button-address-delete"
                        onClick={(e) => handleDeleteData(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={tableRange} slice={slice} setPage={setPage} page={page} />
      {slice ? null : <p>No row to show</p>}
      {message === 'error-deleted-address' && (
        <Alert severity="warning" sx={{ mt: 3 }}>Lỗi khi xóa địa chỉ giao hàng</Alert>
      )}
      {message === 'deleted-address' && (
        <Alert severity="success" sx={{ mt: 3 }}>Đã xóa địa chỉ giao hàng</Alert>
      )}
    </div>
  );
};

export default Table;
