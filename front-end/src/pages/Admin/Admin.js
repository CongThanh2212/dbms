import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TextField from "@mui/material/TextField";
import "./Admin.css";
import { Button, Table } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableData from "../../components/Table/AdminTable";

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
                    <Typography component={"span"}>{children}</Typography>
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
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Admin() {
    const userColumns = [
        { field: "id", header: "ID" },
        { field: "username", header: "Tài khoản" },
        { field: "lastname", header: "Họ" },
        { field: "firstname", header: "Tên" },
        { field: "email", header: "Email" },
        { field: "phone", header: "SĐT" },
    ];
    const productColumns = [
        { field: "id", header: "ID" },
        { field: "productName", header: "Tên" },
        { field: "setName", header: "Bộ sản phẩm" },
        { field: "price", header: "Giá" },
        { field: "quantityInStock", header: "SL trong kho" },
        { field: "soldNumber", header: "SL đã bán" },
        { field: "authorName", header: "Tác giả" },
        { field: "providerName", header: "NXB" },
    ];
    const productsetColumns = [
        { field: "id", header: "ID" },
        { field: "name", header: "Tên" },
        { field: "description", header: "Mô tả" },
        { field: "newestChap", header: "Tập mới nhất" },
        { field: "authorName", header: "Tác giả" },
        { field: "providerName", header: "NXB" },
    ];
    const categoryColumns = [
        { field: "id", header: "ID" },
        { field: "name", header: "Tên" },
        { field: "description", header: "Mô tả" },
    ];
    const authorColumns = [
        { field: "id", header: "ID" },
        { field: "name", header: "Tên" },
    ];
    const providerColumns = [
        { field: "id", header: "ID" },
        { field: "name", header: "Tên" },
    ];
    const orderColumns = [
        { field: "orderCode", header: "Mã đơn hàng" },
        { field: "username", header: "Tài khoản" },
        { field: "userPhone", header: "Điện thoại" },
        { field: "address", header: "Địa chỉ" },
        { field: "detail", header: "Trạng thái" },
        { field: "orderDate", header: "Thời gian mua hàng" },
        { field: "paidAt", header: "Thời gian xác nhận thanh toán" },
        { field: "paidAmount", header: "Tổng tiền" },
    ];
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const userInfoShow = (() => (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="user tabs"
                >
                    <Tab label="Tài khoản" {...a11yProps(0)} />
                    <Tab label="Sản phẩm" {...a11yProps(1)} />
                    <Tab label="Bộ sản phẩm" {...a11yProps(2)} />
                    <Tab label="Thể loại sản phẩm" {...a11yProps(3)} />
                    <Tab label="Tác giả" {...a11yProps(4)} />
                    <Tab label="Nhà xuất bản" {...a11yProps(5)} />
                    <Tab label="Đơn hàng" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TableData
                    columns={userColumns}
                    hover={true}
                    striped={true}
                    type={"user"}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableData
                    columns={productColumns}
                    hover={true}
                    striped={true}
                    type={"product"}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TableData
                    columns={productsetColumns}
                    hover={true}
                    striped={true}
                    type={"product-set"}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TableData
                    columns={categoryColumns}
                    hover={true}
                    striped={true}
                    type={"category"}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TableData
                    columns={authorColumns}
                    hover={true}
                    striped={true}
                    type={"author"}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <TableData
                    columns={providerColumns}
                    hover={true}
                    striped={true}
                    type={"provider"}
                />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <TableData
                    columns={orderColumns}
                    hover={true}
                    striped={true}
                    type={"order"}
                />
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
