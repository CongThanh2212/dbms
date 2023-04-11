import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductTab from "../../components/ProductTab/ProductTab";
import "./Home.css";

async function GetProductBySet(url) {
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductSetById(productSetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product-set/by-id/` +
        productSetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Home() {
    let [productInCategoryHot, setProductInCategoryHot] = useState([]);
    let [productInCategoryNew, setProductInCategoryNew] = useState([]);
    let [productInSet5, setProductInSet5] = useState([]);
    let [productInSet6, setProductInSet6] = useState([]);
    let [productInSet7, setProductInSet7] = useState([]);
    let [productInSet8, setProductInSet8] = useState([]);
    let [productSet5, setproductSet5] = useState([]);
    let [productSet6, setproductSet6] = useState([]);
    let [productSet7, setproductSet7] = useState([]);
    let [productSet8, setproductSet8] = useState([]);
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, []);
    let handleData = async () => {
        let responseProductSetHot = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/get-by-sold/sort`
        );
        setProductInCategoryHot(responseProductSetHot);
        let responseProductSetNew = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-time`
        );
        setProductInCategoryNew(responseProductSetNew);
        let response5 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/5`
        );
        setProductInSet5(response5);
        let response6 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/6`
        );
        setProductInSet6(response6);
        let response7 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/7`
        );
        setProductInSet7(response7);
        let response8 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/8`
        );
        setProductInSet8(response8);
        let response15 = await GetProductSetById(5);
        setproductSet5(response15[0].name.toUpperCase());
        let response16 = await GetProductSetById(6);
        setproductSet6(response16[0].name.toUpperCase());
        let response17 = await GetProductSetById(7);
        setproductSet7(response17[0].name.toUpperCase());
        let response18 = await GetProductSetById(8);
        setproductSet8(response18[0].name.toUpperCase());
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                {ProductTab("TRUYỆN HOT", productInCategoryHot)}
            </Box>
            <Box className="box">
                {ProductTab("TRUYỆN MỚI", productInCategoryNew)}
            </Box>
            <Box className="box">{ProductTab(productSet5, productInSet5)}</Box>
            <Box className="box">{ProductTab(productSet6, productInSet6)}</Box>
            <Box className="box">{ProductTab(productSet7, productInSet7)}</Box>
        </Box>
    );
}
