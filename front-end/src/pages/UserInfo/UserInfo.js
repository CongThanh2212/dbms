import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TextField from '@mui/material/TextField';
import './UserInfo.css'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TableData from "../../components/Table/UserTable"
import { Grid } from "@mui/material";
import Alert from '@mui/material/Alert';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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

async function updateUserInfo(credentials) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/user/update/`;
  let data = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
  return data;
}

async function changePassword(credentials) {
  let url = `${process.env.REACT_APP_SV_HOST}/account/updatePassword`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function addAddress(credentials) {
  let url = `${process.env.REACT_APP_SV_HOST}/models/address/add`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function UserInfo() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  let [userInfo, setUserInfo] = useState([]);
  let [editUserInfo, setEditUserInfo] = useState(false);
  let [editPassword, setEditPassword] = useState(false);
  let [changed, setChanged] = useState(0);
  let [message, setMessage] = useState("");
  let [addressInfo, setAddressInfo] = useState([]);
  let [userFirstname, setUserFirstname] = useState("");
  let [userLastname, setUserLastname] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPhone, setUserPhone] = useState("");
  let [editFirstName, setEditFirstName] = useState(false);
  let [editLastName, setEditLastname] = useState(false);
  let [editEmail, setEditEmail] = useState(false);
  let [editPhone, setEditPhone] = useState(false);
  useEffect(() => {
    handleData();
  }, [changed]);
  let handleData = async () => {
    let userId = sessionStorage.getItem('userId');
    let response = await getUserInfoById(userId);
    setUserInfo(response.user);
    setAddressInfo(response.address);
  };
  const handleTabChange = (event, newValue) => {
    setEditUserInfo(false);
    setEditPassword(false);
    setMessage("");
    setValue(newValue);
    setEditFirstName(false);
    setEditLastname(false);
    setEditEmail(false);
    setEditPhone(false);
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let response = await updateUserInfo({
      id: sessionStorage.getItem('userId'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      phone: data.get('phone'),
      email: data.get('email'),
    })
    if (!response.error) {
      setMessage("update-info");
      setUserInfo(response);
      setTimeout(() => window.location.reload(), 1500);
    }
    else {
      setMessage("error-update-info");
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let currentPassword = data.get('currentPassword');
    let newPassword = data.get('newPassword');
    let reNewPassword = data.get('reNewPassword');
    if (currentPassword === userInfo.password && newPassword === reNewPassword) {
      const response = await changePassword({
        id: sessionStorage.getItem('userId'),
        password: newPassword
      })
      if (response.message === "Updated") {
        setMessage("update-password");
        let data = await getUserInfoById(sessionStorage.getItem('userId'));
        setUserInfo(data.user);
        setTimeout(() => window.location.reload(), 1500);
      }
      else {
        setMessage("wrong-current-password");
      }
    }
    else {
      if (currentPassword !== userInfo.password) {
        setMessage("wrong-current-password");
      }
      else {
        setMessage("wrong-renew-password");
      }
    }
  };
  const handleAddAddress = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const response = await addAddress({
      homeAddress: data.get('homeAddress'),
      street: data.get('street'),
      district: data.get('district'),
      province: data.get('province'),
      userId: sessionStorage.getItem('userId')
    })
    if (!response.error) {
      setMessage("update-address");
      setTimeout(() => window.location.reload(), 1500);
    }
    else {
      setMessage("error-update-address");
    }
  }

  const openEditUserInfo = (e) => {
    setEditUserInfo(true);
    setEditFirstName(true);
    setEditLastname(true);
    setEditEmail(true);
    setEditPhone(true);
  }
  const openEditPassword = (e) => {
    setEditPassword(true);
  }
  const addressColumns = [
    { field: "id", header: "ID" },
    { field: "homeAddress", header: "Số nhà" },
    { field: "street", header: "Đường" },
    { field: "district", header: "Phường/quận" },
    { field: "province", header: "Tỉnh/thành phố" },
  ];
  const orderColumns = [
    { field: "orderCode", header: "Mã đơn hàng" },
    { field: "userPhone", header: "Điện thoại" },
    { field: "address", header: "Địa chỉ" },
    { field: "orderDate", header: "Thời gian mua hàng" },
    { field: "shippedDate", header: "Thời gian nhận hàng" },
    { field: "paidAt", header: "Thời gian thanh toán" },
    { field: "detail", header: "Trạng thái" },
    { field: "paidAmount", header: "Tổng tiền" },
  ];
  const userInfoShow = (() => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="user tabs">
          <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
          <Tab label="Địa chỉ giao hàng" {...a11yProps(1)} />
          <Tab label="Lịch sử mua hàng" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {userInfo && !editUserInfo && !editPassword && (
          <div className='user-info-text'>
            <div className='text'>
              <Box>
                Tên tài khoản:
              </Box>
            </div>
            <div className='text'>{userInfo.username}</div>
            <div className='text'>
              <Box>
                Mật khẩu:
              </Box>
            </div>
            <div className='text'>*******</div>
            <div className='text'>
              <Box>
                Họ tên:
              </Box>
            </div>
            <div className='text'>
              <Box>
                {userInfo.lastname} {userInfo.firstname}
              </Box>
            </div>
            <div className='text'>
              <Box>
                Số điện thoại:
              </Box>
            </div>
            <div className='text'>
              <Box>
                {userInfo.phone}
              </Box>
            </div>
            <div className='text'>
              <Box>
                Email:
              </Box>
            </div>
            <div className='text'>
              <Box>
                {userInfo.email}
              </Box>
            </div>
            <div className='user-button'>
              <Button variant="contained" onClick={openEditUserInfo}>Chỉnh sửa</Button>
            </div>
            <div className='user-button'>
              <Button variant="contained" onClick={openEditPassword}>Đổi mật khẩu</Button>
            </div>
          </div>
        )}
        {userInfo && editUserInfo && !editPassword && (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleUpdateInfo}
          >
            <TextField
              id="lastname"
              name="lastname"
              label="Họ"
              defaultValue="Empty"
              value={userLastname ? userLastname : (editLastName ? userInfo.lastname : "")}
              onChange={(e) => { setUserLastname(e.target.value); setEditLastname(false); }}
            />
            <TextField
              id="firstname"
              name="firstname"
              label="Tên"
              defaultValue="Empty"
              value={userFirstname ? userFirstname : (editFirstName ? userInfo.firstname : "")}
              onChange={(e) => { setUserFirstname(e.target.value); setEditFirstName(false); }}
            />
            <TextField
              id="phone"
              name="phone"
              label="Số điện thoại"
              defaultValue="Empty"
              value={userPhone ? userPhone : (editPhone ? userInfo.phone : "")}
              onChange={(e) => { setUserPhone(e.target.value); setEditPhone(false); }}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              defaultValue="Empty"
              value={userEmail ? userEmail : (editEmail ? userInfo.email : "")}
              onChange={(e) => { setUserEmail(e.target.value); setEditEmail(false); }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Cập nhật
            </Button>
            {message === 'error-update-info' && (
              <Alert severity="warning">Không cập nhật được thông tin</Alert>
            )}
            {message === 'update-info' && (
              <Alert severity="success">Cập nhật thông tin thành công</Alert>
            )}
          </Box>
        )}
        {userInfo && !editUserInfo && editPassword && (
          <div style={{ maxWidth: "100%" }}>
            <Box
              component="form"
              onSubmit={handlePasswordSubmit}
              noValidate
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="line">
                <TextField
                  id="currentPassword"
                  label="Mật khẩu hiện tại"
                  name="currentPassword"
                  type="password"
                  required
                  sx={{ mb: 2 }}
                />
              </div>
              <div className="line">
                <TextField
                  id="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  name="newPassword"
                  required
                  sx={{ mb: 2 }}
                />
              </div>
              <div className="line">
                <TextField
                  id="reNewPassword"
                  label="Nhập lại mật khẩu mới"
                  type="password"
                  name="reNewPassword"
                  required
                  sx={{ mb: 2 }}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Đổi mật khẩu
              </Button>
              {message === 'wrong-current-password' && (
                <Alert severity="warning">Mật khẩu hiện tại không chính xác</Alert>
              )}
              {message === 'wrong-renew-password' && (
                <Alert severity="warning">Mật khẩu nhập lại không chính xác</Alert>
              )}
              {message === 'update-password' && (
                <Alert severity="success">Đã cập nhật mật khẩu mới</Alert>
              )}
            </Box>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          component="form"
          onSubmit={handleAddAddress}
          noValidate
        >
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Thêm địa chỉ giao hàng</Typography>
          </Box>
          <Box>
            <Grid container wrap='nowrap'>
              <Grid item>
                <TextField
                  id="homeAddress"
                  label="Số nhà"
                  name="homeAddress"
                  sx={{ mr: 2, width: 250 }}
                  type='small'
                />
              </Grid>
              <Grid item>
                <TextField
                  id="street"
                  label="Đường"
                  name="street"
                  sx={{ mr: 2, width: 250 }}
                  type='small'
                />
              </Grid>
              <Grid item>
                <TextField
                  id="district"
                  label="Phường/quận"
                  name="district"
                  sx={{ mr: 2, width: 250 }}
                  type='small'
                />
              </Grid>
              <Grid item>
                <TextField
                  id="province"
                  label="Tỉnh/thành phố"
                  name="province"
                  sx={{ mr: 3, width: 250 }}
                  type='small'
                />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
            {message === 'update-address' && (
              <Alert severity="success">Đã cập nhật địa chỉ giao hàng mới</Alert>
            )}
            {message === 'error-update-address' && (
              <Alert severity="warning">Lỗi khi thêm địa chỉ giao hàng mới</Alert>
            )}
          </Box>

        </Box>
        <Box sx={{ mt: 5, mb: 1 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Địa chỉ giao hàng hiện tại</Typography>
        </Box>
        <TableData columns={addressColumns} hover={true} striped={true} type="address" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableData columns={orderColumns} hover={true} striped={true} type="order" />
      </TabPanel>
    </Box>
  ))();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box width="100%">{Header()}</Box>
      <Box width="100%">{userInfoShow}</Box>
    </Box>
  );
}
