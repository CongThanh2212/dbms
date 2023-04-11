import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductTab from "../../components/ProductTab/ProductTab";
import "./Product.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

async function GetProductById(productId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-id/` + productId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductBySet(productsetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-set/` +
        productsetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductSetById(productsetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product-set/by-id/` +
        productsetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProviderById(providerId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/provider/by-id/` + providerId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Product() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productId = params.get("id");
    let userId = sessionStorage.getItem("userId");
    let [productInfo, setProductInfo] = useState([]);
    let [productSetInfo, setProductSetInfo] = useState([]);
    let [productInSetInfo, setProductInSetInfo] = useState([]);
    let [categoryInfo, setCategoryInfo] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productId]);
    let handleData = async () => {
        let response = await GetProductById(productId);
        setProductInfo(response.product[0]);
        let response2 = await GetProductSetById(
            response.product[0].productsetId
        );
        setProductSetInfo(response2[0]);
        let response3 = await GetProductBySet(response.product[0].productsetId);
        setProductInSetInfo(response3);
        setCategoryInfo(response.categories);
        setAmount((counter) => 0);
    };
    let [amount, setAmount] = useState(0);
    function changeAmount(value, limit) {
        setAmount((counter) => Math.min(Math.max(0, counter + value), limit));
    }

    let productShow = ((data = productInfo) => (
        <Item className="box product box-product-info">
            <Box className="box product box-product-image">
                <img
                    className="image"
                    src={data.image}
                    alt={data.productName}
                />
            </Box>
            <Box className="box product box-product-detail">
                <Box className="box product box-product-text">
                    <Box className="box product box-product-name">
                        {data.productName}
                    </Box>
                    <Box
                        className="box product box-product-set-name"
                        onClick={() =>
                            navigate(`/product-set/?id=${data.productsetId}`)
                        }
                    >
                        Bộ: {data.setName}
                    </Box>
                    <Box className="box product box-product-provider-name">
                        Nhà xuất bản: {data.providerName}
                    </Box>
                    <Box className="box product box-product-price">
                        {data.price} đ
                    </Box>
                </Box>
                {data.quantityInStock == 0 && (
                    <Box className="box product box-out-of-stock">
                        Sản phẩm đã hết hàng
                    </Box>
                )}
                {data.quantityInStock != 0 && (
                    <Box className="box product box-quantity-control">
                        <Button
                            className="box product button-quantity-change"
                            onClick={() => {
                                changeAmount(-1, data.quantityInStock);
                            }}
                        >
                            -
                        </Button>
                        <Box className="box product box-quantity-num">
                            {amount}
                        </Box>
                        <Button
                            className="box product button-quantity-change"
                            onClick={() => {
                                let info = localStorage.getItem(
                                    userId * 1000 + data.id
                                );
                                info = JSON.parse(info);
                                let quantity = info == null ? 0 : info.quantity;
                                changeAmount(
                                    1,
                                    data.quantityInStock - quantity
                                );
                            }}
                        >
                            +
                        </Button>
                    </Box>
                )}
                {data.quantityInStock != 0 && (
                    <Button
                        className="box product button-add-to-cart"
                        variant="outlined"
                        onClick={() => {
                            if (amount > 0) {
                                let info = localStorage.getItem(
                                    userId * 1000 + data.id
                                );
                                info = JSON.parse(info);
                                let quantity = info == null ? 0 : info.quantity;
                                quantity += amount;
                                let newInfo = {
                                    productName: data.productName,
                                    image: data.image,
                                    price: data.price,
                                    quantity: quantity,
                                };
                                newInfo = JSON.stringify(newInfo);
                                localStorage.setItem(
                                    userId * 1000 + data.id,
                                    newInfo
                                );
                                setAmount((counter) =>
                                    Math.min(1, data.quantityInStock - quantity)
                                );
                                setOpen1(true);
                            } else {
                                setOpen2(true);
                            }
                        }}
                    >
                        THÊM VÀO GIỎ
                    </Button>
                )}
            </Box>
        </Item>
    ))();
    let categoryShow =
        Array.isArray(categoryInfo) &&
        categoryInfo.map((data) => (
            <Box className="box product category-show">{data.name} </Box>
        ));

    let productInfoDetailShow = ((data = productInfo) => (
        <Item className="box product product-info-detail-show">
            <Box className="box product product-info-detail-show-element">
                Nhà xuất bản: {data.providerName}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Tác giả: {data.authorName}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Năm xuất bản: {data.publishedYear}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Kích thước bìa: {data.productSize}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Số trang: {data.pageNumber}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Thể loại: {categoryShow}{" "}
            </Box>
        </Item>
    ))();
    const [open1, setOpen1] = React.useState(false);
    const handleClick1 = () => {
        navigate("/cart");
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
        setOpen2(false);
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">{productShow}</Box>
            <Box className="box">{productInfoDetailShow}</Box>
            <Box className="box">
                {ProductTab("TRUYỆN CÙNG BỘ", productInSetInfo)}
            </Box>
            <Dialog
                className="product-tab popup box"
                open={open1}
                onClose={handleClose1}
            >
                <DialogContent>
                    <DialogContentText className="product-tab popup text">
                        ĐÃ THÊM VÀO GIỎ HÀNG
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="product-tab popup button-text"
                        onClick={handleClick1}
                    >
                        THANH TOÁN
                    </Button>
                    <Button onClick={handleClose1}>TIẾP TỤC MUA SẮM</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                className="product-tab popup box"
                open={open2}
                onClose={handleClose2}
            >
                <DialogContent>
                    <DialogContentText className="product-tab popup text">
                        SỐ LƯỢNG YÊU CẦU KHÔNG KHẢ DỤNG
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2}>TIẾP TỤC MUA SẮM</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
