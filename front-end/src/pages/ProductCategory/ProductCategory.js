import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./ProductCategory.css";

async function GetProductByCategory(productCategoryId) {
    let url;
    if (productCategoryId == "hot") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/get-by-sold/sort`;
    } else if (productCategoryId == "new") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/by-time`;
    } else {
        url =
            `${process.env.REACT_APP_SV_HOST}/models/product/by-category/` +
            productCategoryId;
    }
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductCategoryById(productCategoryId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/category/by-id/` +
        productCategoryId;

    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function ProductCategory() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productCategoryId = params.get("id");
    let [productCategoryInfo, setProductCategoryInfo] = useState("");
    let [productInCategoryInfo, setProductInCategoryInfo] = useState([]);
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productCategoryId]);
    let handleData = async () => {
        let response = await GetProductByCategory(productCategoryId);
        setProductInCategoryInfo(response);
        if (productCategoryId == "hot") {
            setProductCategoryInfo("TRUYỆN HOT");
        } else if (productCategoryId == "new") {
            setProductCategoryInfo("TRUYỆN MỚI");
        } else {
            let response2 = await GetProductCategoryById(productCategoryId);
            setProductCategoryInfo(response2.name);
        }
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                {ProductGrid(
                    productCategoryInfo.toUpperCase(),
                    productInCategoryInfo
                )}
            </Box>
        </Box>
    );
}
