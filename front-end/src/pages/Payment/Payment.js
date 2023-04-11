import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./Payment.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

async function GetAddressByUserId(userId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/address/by-user/` + userId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

function GetAllStorage(userId) {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        let id = parseInt(keys[i]);
        let thisUserId = parseInt(id / 1000);
        if (thisUserId == userId) {
            var obj = JSON.parse(localStorage.getItem(keys[i]));
            storage.push({ ...obj, id });
        }
    }
    return storage;
}

async function AddOrder(credentials) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/order/add`;
    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((body) => body.json());
    return data;
}

async function ConfirmOrder(orderId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/order/confirm/` + orderId;
    let data = await fetch(url, {
        method: "PUT",
    }).then((body) => body.text());
    return data;
}

async function DeleteCart(userId) {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        let id = parseInt(keys[i]);
        let thisUserId = parseInt(id / 1000);
        if (thisUserId == userId) {
            localStorage.removeItem(keys[i]);
        }
    }
    return storage;
}

export default function Payment() {
    let userId = sessionStorage.getItem("userId");
    let [addressInfo, setAddressInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let response = await GetAddressByUserId(userId);
        setAddressInfo(response);
    };
    // function deleteAddress(index) {
    //     if (Array.isArray(addressInfo)) {
    //         let nextAddressInfo = addressInfo.map((data, idx) => {
    //             if (idx == index) {
    //                 return null;
    //             } else return data;
    //         });
    //         let idx = nextAddressInfo.indexOf(null);
    //         nextAddressInfo.splice(idx, 1);
    //         setAddressInfo(nextAddressInfo);
    //     }
    // }
    let [selectedAddress, setSelectedAddress] = useState(0);
    let handleChange = (event) => {
        setSelectedAddress(event.target.value);
    };
    addressInfo = addressInfo.map(
        (data) =>
            `${data.homeAddress}, ${data.street}, ${data.district}, ${data.province}`
    );
    let addressShow =
        Array.isArray(addressInfo) &&
        addressInfo.map((data, index) => (
            <Item className="box payment box-address">
                <Box className="box payment box-checkbox">
                    <Radio
                        name="button-address-radio"
                        className="box payment button-address-radio"
                        checked={selectedAddress == index}
                        onChange={handleChange}
                        value={index}
                    />
                </Box>
                <Box className="box payment box-address-info">
                    <Box className="box payment text-address-info">
                        Địa chỉ: {data}
                    </Box>
                </Box>
                {/* <Box className="box payment box-address-change">
                    <Box className="box payment box-address-edit">
                        <IconButton
                            className="box payment button-address-edit"
                            onClick={() => {
                                changeAddress(index);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Box className="box payment box-address-delete">
                        <IconButton
                            className="box payment button-address-delete"
                            onClick={() => {
                                deleteAddress(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box> */}
            </Item>
        ));
    let shipCost = 15000;
    let shipMethodShow = (
        <Item className="box payment box-ship">
            <Box className="box payment box-checkbox">
                <Radio
                    name="button-ship-radio"
                    className="box payment button-ship-radio"
                    checked={true}
                />
            </Box>
            <Box className="box payment box-ship-info">
                <Box className="box payment text-ship-info">
                    Giao hàng tiêu chuẩn: {shipCost}
                </Box>
            </Box>
        </Item>
    );
    let [selectedPayment, setSelectedPayment] = useState(1);
    let handleChange2 = (event) => {
        setSelectedPayment(event.target.value);
    };
    let paymentMethodShow = (
        <Box className="box">
            <Item className="box payment box-payment">
                <Box className="box payment box-checkbox">
                    <Radio
                        name="button-payment-radio"
                        className="box payment button-payment-radio"
                        checked={selectedPayment == 1}
                        onChange={handleChange2}
                        value={1}
                    />
                </Box>
                <Box className="box payment box-payment-info">
                    <Box className="box payment text-payment-info">
                        Thanh toán qua mã QR
                    </Box>
                </Box>
            </Item>
            <Item className="box payment box-payment">
                <Box className="box payment box-checkbox">
                    <Radio
                        name="button-payment-radio"
                        className="box payment button-payment-radio"
                        checked={selectedPayment == 2}
                        onChange={handleChange2}
                        value={2}
                    />
                </Box>
                <Box className="box payment box-payment-info">
                    <Box className="box payment text-payment-info">
                        Thanh toán khi nhận hàng
                    </Box>
                </Box>
            </Item>
        </Box>
    );
    userId = parseInt(userId);
    let [cartInfo, setCartInfo] = useState([]);
    useEffect(() => {
        handleData2();
    }, []);
    let handleData2 = () => {
        let response = GetAllStorage(userId);
        setCartInfo(response);
    };
    let cartShow =
        Array.isArray(cartInfo) &&
        cartInfo.map((data, index) => (
            <Item className="box payment box-product-info">
                <Box className="box payment box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box payment box-product-details">
                    <Box className="box payment box-product-productInfo">
                        <Box className="box payment box-product-productName">
                            {data.productName}
                        </Box>
                        <Box className="box payment box-product-price">
                            Giá: {data.price}
                        </Box>
                    </Box>
                    <Box className="box payment box-quantity">
                        Số lượng: {data.quantity}
                    </Box>
                    <Box className="box payment box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                </Box>
            </Item>
        ));

    let totalPayment = 0;
    if (Array.isArray(cartInfo)) {
        for (let i in cartInfo) {
            let product = cartInfo[i];
            totalPayment += product.quantity * product.price;
        }
    }
    cartInfo = cartInfo.map((data) => ({
        orderNumber: data.quantity,
        price: data.price,
        productId: data.id % 1000,
    }));
    const [QRCode, setQRCode] = useState("");
    const [orderId, setOrderId] = useState(0);
    const [open1, setOpen1] = React.useState(false);
    let navigate = useNavigate();
    const handleClick1 = () => {
        ConfirmOrder(orderId);
        handleClose1();
        setOpen2(true);
        DeleteCart(userId);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);
    const handleClick2 = () => {
        handleClose2();
        DeleteCart(userId);
        navigate("/");
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    async function CreateOrder() {
        let paymentInfo = [
            {
                paidAmount: totalPayment + shipCost,
                address: addressInfo[selectedAddress],
                paymentId: selectedPayment,
                userId: userId,
            },
        ];
        let data = paymentInfo.concat(cartInfo);
        let response = await AddOrder(data);
        if (selectedPayment == 1) {
            console.log(response);
            setQRCode(response.paymentUrl);
            setOrderId(response.orderId);
            setOpen1(true);
        }
        if (selectedPayment == 2) {
            setOpen2(true);
        }
    }
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Item className="box payment box-all-address">
                <Box className="box payment box-address-title">
                    <Box className="box payment text-address-title">
                        ĐỊA CHỈ GIAO HÀNG
                    </Box>
                </Box>
                {addressShow}
            </Item>
            <Item className="box payment box-all-ship">
                <Box className="box payment box-ship-title">
                    <Box className="box payment text-ship-title">
                        PHƯƠNG THỨC VẬN CHUYỂN
                    </Box>
                </Box>
                {shipMethodShow}
            </Item>
            <Item className="box payment box-all-payment">
                <Box className="box payment box-payment-title">
                    <Box className="box payment text-payment-title">
                        PHƯƠNG THỨC THANH TOÁN
                    </Box>
                </Box>
                {paymentMethodShow}
            </Item>
            <Item className="box payment box-all-order">
                <Box className="box payment box-order-title">
                    <Box className="box payment text-order-title">ĐƠN HÀNG</Box>
                </Box>
                {cartShow}
            </Item>
            <Item className="box payment box-order-detail">
                <Box className="box payment box-order-cost">
                    <Box className="box payment text-order-cost">
                        TỔNG ĐƠN HÀNG: {totalPayment}
                        <br></br>
                        PHÍ VẬN CHUYỂN: {shipCost}
                        <br></br>
                        TỔNG SỐ TIỀN: {totalPayment + shipCost}
                    </Box>
                </Box>
                <Box className="box payment box-order-confirm">
                    <Button
                        className="box payment button-order-confirm"
                        onClick={() => {
                            CreateOrder();
                        }}
                    >
                        THANH TOÁN
                    </Button>
                </Box>
                <Dialog open={open1} onClose={handleClose1}>
                    <DialogContent>
                        <img className="image" src={QRCode} alt="QRCode" />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="popup button-payment"
                            onClick={handleClick1}
                        >
                            Xác nhận thanh toán
                        </Button>
                        <Button
                            className="popup button-payment"
                            onClick={handleClose1}
                        >
                            HUỶ
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open2} onClose={handleClose2}>
                    <DialogContent>
                        <DialogContentText className="popup text">
                            ĐẶT HÀNG THÀNH CÔNG
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="popup button-payment"
                            onClick={handleClick2}
                        >
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </Item>
        </Box>
    );
}
