import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const Search = styled(Box)(({ theme }) => ({
    // position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        margin: "auto",
        width: "auto",
    },
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.7,
    [theme.breakpoints.down("sm")]: {
        flex: 1,
    },
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    height: "100%",
    // position: "absolute",
    // pointerEvents: "none",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 0, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        // [theme.breakpoints.up("md")]: {
        //   width: "50ch", // search bar width
        // },
    },
    flex: 7,
}));

export default function SearchBar() {
    const navigate = useNavigate();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let searchName = params.get("name");
    if (searchName === null) searchName = "";
    let [searchValue, setSearchValue] = useState(searchName);

    const handleChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    };
    const handleSearch = (event) => {
        event.preventDefault();
        // if (searchValue)
        navigate(`/search/?name=${searchValue}`);
    };

    return (
        <Search className="Search" component="form" onSubmit={handleSearch}>
            <SearchIconWrapper
                className="SearchIconWrapper"
                aria-label="search icon"
                onClick={handleSearch}
            >
                <SearchIcon className="SearchIcon" />
            </SearchIconWrapper>
            <StyledInputBase
                className="StyledInputBase"
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "search bar" }}
                autoComplete="off"
                value={searchValue}
                onChange={handleChange}
            />
        </Search>
    );
}
