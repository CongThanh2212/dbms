import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { Link } from "react-router-dom";
import "./ProductSet.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

async function GetProductBySetId(productSetId, page, pageSize) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/product/by-set/${productSetId}?page=${page}&size=${pageSize}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductSetById(productSetId) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/product-set/by-id/${productSetId}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function ProductSet() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productsetId = params.get("id");
    let page = parseInt(params.get("page") || "1", 10);
    let pageSize = parseInt(params.get("size") || "10", 5);
    let [productInSetInfo, setProductInSetInfo] = useState([]);
    let [productSetInfo, setProductSetInfo] = useState([]);
    let [productSetName, setProductSetName] = useState("");
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productsetId, page, pageSize]);
    let handleData = async () => {
        let response = await GetProductBySetId(productsetId, page, pageSize);
        setProductInSetInfo(response);
        let response2 = await GetProductSetById(productsetId);
        setProductSetInfo(response2[0]);
        setProductSetName(response2[0].name);
    };

    let productSetShow = ((data = productSetInfo) => (
        <Item className="box product-set box-product-info">
            <Box className="box product-set box-product-image">
                <img className="image" src={data.image} alt={data.name} />
            </Box>
            <Box className="box product-set box-product-detail">
                <Box className="box product-set box-product-text">
                    <Box className="box product-set box-product-name">
                        Bộ: {data.name}
                    </Box>
                    <Box className="box product-set box-product-provider-name">
                        Nhà xuất bản: {data.providerName}
                    </Box>
                    <Box className="box product-set box-product-provider-name">
                        Tác giả: {data.authorName}
                    </Box>
                    <Box className="box product-set box-product-chap">
                        Chap mới nhất: {data.newestChap}
                    </Box>
                </Box>
            </Box>
        </Item>
    ))();

    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box>{productSetShow}</Box>
            <Box className="box">
                {ProductGrid(productSetName.toUpperCase(), productInSetInfo)}
            </Box>
            <Box className="box search box-pagination">
                <Pagination
                    className="box search pagination"
                    page={page}
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem
                            className="box search pagination-item"
                            component={Link}
                            to={`/product-set/?id=${productsetId}&page=${item.page}&size=${pageSize}`}
                            {...item}
                        />
                    )}
                    siblingCount={1}
                    boundaryCount={1}
                />
            </Box>
        </Box>
    );
}
