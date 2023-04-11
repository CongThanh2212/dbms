import * as React from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { Link } from "react-router-dom";
import "./Search.css";

async function SearchProductByName(searchName, page, pageSize) {
    let url = `${process.env.REACT_APP_SV_HOST}/search/?name=${searchName}&page=${page}&size=${pageSize}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Search() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let searchName = params.get("name");
    if (searchName === null) searchName = "";
    let page = parseInt(params.get("page") || "1", 10);
    let pageSize = parseInt(params.get("size") || "10", 10);
    let [searchInfo, setSearchInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, [searchName, page, pageSize]);
    let handleData = async () => {
        let response = await SearchProductByName(searchName, page, pageSize);
        setSearchInfo(response);
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                {ProductGrid("KẾT QUẢ TÌM KIẾM", searchInfo)}
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
                            to={`/search/?name=${searchName}&page=${item.page}&size=${pageSize}`}
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
