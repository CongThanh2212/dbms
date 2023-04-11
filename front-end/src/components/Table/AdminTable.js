import React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import TableFooter from "./TableFooter";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DataArray } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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

async function getData(type) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/`;
    if (type === "product" || type === "product-set")
        url = url + type + "/admin/info";
    else {
        url = url + type;
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

async function getProductDetail(id) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/product/by-id/${id}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}
async function getProductSetDetail(id) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/product-set/by-id/${id}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}


async function addData(credentials, type) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/`;
    if (type === "product" || type === "product-set") {
        url = url + type + "/admin/add";
    } else url = url + type + "/add";
    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return data;
}

async function updateData(credentials, type) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/`;
    if (type === "product" || type === "product-set") {
        url = url + type + "/admin/update";
    } else url = url + type + "/update";

    let data = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return data;
}

async function updateOrderStatus(id) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/order/update/` + id;
    let data = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function getOrderByOrderCode(orderCode) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/order/by-code/?orderCode=` + orderCode;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function changeOrderStatus(credentials, orderCode) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/order/admin/update/` + orderCode;
    let data = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return data;
}

async function deleteData(type, id) {
    let url = `${process.env.REACT_APP_SV_HOST}/models/${type}/delete/${id}`;
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
}

function getStyles(value, items, theme) {
    return {
        fontWeight:
            items.indexOf(value) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Table = ({
    columns = null,
    hover = true,
    striped = true,
    rowsPerPage = 5,
    type = null,
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const theme = useTheme();
    let [currentData, setCurrentData] = useState([]);
    let [message, setMessage] = useState("");
    let [soldStatus, setSoldStatus] = useState("");
    let [productSet, setProductSet] = useState([]);
    let [author, setAuthor] = useState([]);
    let [category, setCategory] = useState([]);
    let [provider, setProvider] = useState([]);
    let [currentCategory, setCurrentCategory] = useState([]);
    let [currentProductSet, setCurrentProductSet] = useState("");
    let [currentAuthor, setCurrentAuthor] = useState("");
    let [currentProvider, setCurrentProvider] = useState("");
    let [productId, setProductId] = useState("");
    let [productName, setProductName] = useState("");
    let [productPrice, setProductPrice] = useState("");
    let [productQuantityInStock, setProductQuantityInStock] = useState("");
    let [productDescription, setProductDescription] = useState("");
    let [productPublishYear, setProductPublishYear] = useState("");
    let [productSize, setProductSize] = useState("");
    let [productPageNumber, setProductPageNumber] = useState("");
    let [productSoldNumber, setProductSoldNumber] = useState("");
    let [productImage, setProductImage] = useState("");
    let [productSetId, setProductSetId] = useState("");
    let [productSetName, setProductSetName] = useState("");
    let [productSetDescription, setProductSetDescription] = useState("");
    let [productSetNewestChap, setProductSetNewestChap] = useState("");
    let [productSetImage, setProductSetImage] = useState("");
    let [orderMessage, setOrderMessage] = useState(false);
    let [orderCode, setOrderCode] = useState("");
    let [orderStatus, setOrderStatus] = useState("");
    let [edit, setEdit] = useState(false);
    let [tableRange, setTableRange] = useState([]);
    let [slice, setSlice] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let response = await getData(type);
        if (type === "product") {
            setCurrentData(response.products);
            setAuthor(response.authors);
            setCategory(response.categories);
            setProductSet(response.sets);
            setProvider(response.providers);
        } else if (type === "product-set") {
            setCurrentData(response.productSet);
            setAuthor(response.authors);
            setProvider(response.providers);
        } else {
            setCurrentData(response);
        }
    };
    useEffect(() => {
        const range = calculateRange(currentData, rowsPerPage);
        setTableRange([...range]);
        const slice = sliceData(currentData, page, rowsPerPage);
        setSlice([...slice]);
    }, [setTableRange, page, setSlice, currentData, author]);
    const getCaps = (head, field) => {
        if (head) return head.toUpperCase();
        return field.toUpperCase();
    };

    const handleAddData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let response = "";
        if (type === "product") {
            if (!edit) {
                response = await addData(
                    {
                        productName: data.get("productName"),
                        price: data.get("price"),
                        quantityInStock: data.get("quantityInStock"),
                        description: data.get("description"),
                        publishedYear: data.get("publishedYear"),
                        productSize: data.get("productSize"),
                        pageNumber: data.get("pageNumber"),
                        soldNumber: data.get("soldNumber"),
                        image: data.get("image"),
                        soldStatus: data.get("soldStatus"),
                        authorName: currentAuthor,
                        setName: currentProductSet,
                        providerName: currentProvider,
                        categories: currentCategory,
                    },
                    type
                );
            } else {
                response = await updateData(
                    {
                        id: productId,
                        productName: data.get("productName"),
                        price: data.get("price"),
                        quantityInStock: data.get("quantityInStock"),
                        description: data.get("description"),
                        publishedYear: data.get("publishedYear"),
                        productSize: data.get("productSize"),
                        pageNumber: data.get("pageNumber"),
                        image: data.get("image"),
                        soldStatus: data.get("soldStatus"),
                        authorName: currentAuthor,
                        setName: currentProductSet,
                        providerName: currentProvider,
                        categories: currentCategory,
                    },
                    type
                );
            }
        }
        if (type === "product-set") {
            if (!edit) {
                response = await addData(
                    {
                        name: data.get("name"),
                        description: data.get("description"),
                        newestChap: data.get("newestChap"),
                        image: data.get("image"),
                        authorName: currentAuthor,
                        providerName: currentProvider,
                    },
                    type
                );
            }
            else {
                response = await updateData(
                    {
                        id: productSetId,
                        name: data.get("name"),
                        description: data.get("description"),
                        newestChap: data.get("newestChap"),
                        image: data.get("image"),
                        authorName: currentAuthor,
                        providerName: currentProvider,
                    },
                    type
                );
            }
        }
        if (type === "category") {
            response = await addData(
                {
                    name: data.get("name"),
                    description: data.get("description"),
                },
                type
            );
        }
        if (type === "author") {
            response = await addData(
                {
                    name: data.get("name"),
                },
                type
            );
        }
        if (type === "provider") {
            response = await addData(
                {
                    name: data.get("name"),
                },
                type
            );
        }
        if (type === 'order') {
            response = await changeOrderStatus({
                orderCode: orderCode,
                detail: orderStatus
            }, orderCode);
        }
        if (!response.error) {
            let newData = [];
            currentData.forEach((element) => {
                newData.push(element);
            });
            setCurrentData(newData);
            if (!edit) setMessage("update-data");
            else setMessage("change-data");
            if (orderMessage) setMessage("change-order");
            setTimeout(() => window.location.reload(), 1500);
            
        } else {
            if (!edit) setMessage("error-update-data");
            else setMessage("error-change-data");
        }
    };
    const handleOrderCode = async (orderCode) => {
        let response = await getOrderDetailByOrderCode(orderCode);
        let data = JSON.stringify(response);
        sessionStorage.setItem("orderdetail", data);
        navigate("/order-detail/?code=" + orderCode);
    };
    const handleDeleteData = async (id) => {
        let response = await deleteData(type, id);
        if (response.message === "Deleted") {
            let newData = [];
            currentData.forEach((element) => {
                if (element.id !== id) {
                    newData.push(element);
                }
            });
            setCurrentData(newData);
            setMessage("deleted-data");
        } else {
            setMessage("error-deleted-data");
        }
    };

    const handleEditProduct = async (id) => {
        let response = await getProductDetail(id);
        let currentProduct = response.product[0];
        setEdit(true);
        setProductId(id);
        setProductName(currentProduct.productName);
        setProductPrice(currentProduct.price);
        setProductQuantityInStock(currentProduct.quantityInStock);
        setProductDescription(currentProduct.description);
        setProductPublishYear(currentProduct.publishedYear);
        setProductSize(currentProduct.productSize);
        setProductPageNumber(currentProduct.pageNumber);
        setProductImage(currentProduct.image);
        setProductSoldNumber(currentProduct.soldNumber);
    };
    const handleEditProductSet = async (id) => {
        let response = await getProductSetDetail(id);
        let data = response[0];
        setEdit(true);
        setProductSetId(id);
        setProductSetName(data.name);
        setProductSetDescription(data.description);
        setProductSetNewestChap(data.newestChap);
        setProductSetImage(data.image);
    };

    const handleEditOrder = async (orderCode) => {
        let response = await getOrderByOrderCode(orderCode);
        setOrderMessage(true);
        setOrderCode(orderCode);
        setOrderStatus(response.detail);
    }

    const handlePaymentOrder = async (id) => {
        let response = await updateOrderStatus(id);
        if (!response.error) {
            if (!response.message) {
                setMessage("update-payment");
                setTimeout(() => window.location.reload(), 1500);
            } else {
                setMessage("paymented");
            }
        } else {
            setMessage("error-update-payment");
        }
    };
    const handleSoldStatusChange = (event) => {
        setSoldStatus(event.target.value);
    };
    const handleAuthorChange = (event) => {
        setCurrentAuthor(event.target.value);
    };
    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentCategory(
            typeof value === "string" ? value.split(",") : value
        );
    };
    const handleProductsetChange = (event) => {
        setCurrentProductSet(event.target.value);
    };
    const handleProviderChange = (event) => {
        setCurrentProvider(event.target.value);
    };
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
                            <tr
                                className={`${hover && "hover"} ${striped && "striped"
                                    }`}
                            >
                                {columns.map((col) => (
                                    <td>{row[col.field]}</td>
                                ))}
                                {type === "product" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handleEditProduct(row.id)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </td>
                                )}
                                {type === "product-set" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handleEditProductSet(row.id)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </td>
                                )}
                                {type === "order" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handleEditOrder(row.orderCode)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </td>
                                )}
                                {type === "order" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handlePaymentOrder(row.id)
                                                }
                                            >
                                                <AttachMoneyIcon />
                                            </IconButton>
                                        </Box>
                                    </td>
                                )}
                                {type === "order" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handleOrderCode(row.orderCode)
                                                }
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </Box>
                                    </td>
                                )}
                                {row.roleId !== 1 && type !== "order" && (
                                    <td>
                                        <Box className="box payment box-address-delete">
                                            <IconButton
                                                className="box payment button-address-delete"
                                                onClick={(e) =>
                                                    handleDeleteData(row.id)
                                                }
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
            <TableFooter
                range={tableRange}
                slice={slice}
                setPage={setPage}
                page={page}
            />
            {type !== "user" && type !== "order" && !edit && !orderMessage && (
                <Typography sx={{ fontWeight: "bold", mt: 5 }}>
                    Thêm dữ liệu mới
                </Typography>
            )}
            {type === "product" && edit && (
                <Typography sx={{ fontWeight: "bold", mt: 5 }}>
                    Chỉnh sửa thông tin sản phẩm
                </Typography>
            )}
            {type ==='product-set' && edit && (
                <Typography sx={{ fontWeight: "bold", mt: 5 }}>
                    Chỉnh sửa thông tin bộ sản phẩm
                </Typography>
            )}
            {type === 'order' && orderMessage && (
                <Typography sx={{ fontWeight: "bold", mt: 5 }}>
                    Chỉnh sửa thông tin đơn hàng
                </Typography>
            )}
            {slice ? null : <p>No row to show</p>}
            {type === "product" && (
                <Box component="form" onSubmit={handleAddData} noValidate>
                    <TextField
                        margin="normal"
                        id="productName"
                        label="Tên sản phẩm"
                        name="productName"
                        value={productName ? productName : ""}
                        onChange={(e) => {
                            setProductName(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="price"
                        label="Giá"
                        id="price"
                        sx={{ mr: 1, width: 220 }}
                        value={productPrice ? productPrice : ""}
                        onChange={(e) => {
                            setProductPrice(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        name="description"
                        label="Mô tả"
                        id="description"
                        value={productDescription ? productDescription : ""}
                        onChange={(e) => {
                            setProductDescription(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="image"
                        label="Ảnh"
                        id="image"
                        value={productImage ? productImage : ""}
                        onChange={(e) => {
                            setProductImage(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="publishedYear"
                        label="Năm phát hành"
                        id="publishedYear"
                        value={productPublishYear ? productPublishYear : ""}
                        onChange={(e) => {
                            setProductPublishYear(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="productSize"
                        label="Kích thước"
                        id="productSize"
                        value={productSize ? productSize : ""}
                        onChange={(e) => {
                            setProductSize(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="pageNumber"
                        label="Số trang"
                        id="pageNumber"
                        value={productPageNumber ? productPageNumber : ""}
                        onChange={(e) => {
                            setProductPageNumber(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="quantityInStock"
                        label="Số lượng trong kho"
                        id="quantityInStock"
                        value={
                            productQuantityInStock ? productQuantityInStock : ""
                        }
                        onChange={(e) => {
                            setProductQuantityInStock(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                    />
                    <TextField
                        margin="normal"
                        name="soldNumber"
                        label="Số lượng đã bán"
                        id="soldNumber"
                        value={productSoldNumber ? productSoldNumber : ""}
                        onChange={(e) => {
                            setProductSoldNumber(e.target.value);
                        }}
                        sx={{ mr: 1, width: 220 }}
                        InputProps={{
                            readOnly: edit ? true : false,
                        }}
                    />
                    <FormControl>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            labelId="soldStatus"
                            id="soldStatus"
                            name="soldStatus"
                            value={soldStatus}
                            sx={{ mr: 1, mt: 2, width: 220 }}
                            onChange={handleSoldStatusChange}
                        >
                            <MenuItem value={1}>Đang bán</MenuItem>
                            <MenuItem value={0}>Đã hết hàng</MenuItem>
                            <MenuItem value={2}>Chưa bán</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tên tác giả</InputLabel>
                        <Select
                            labelId="authorName"
                            id="authorName"
                            onChange={handleAuthorChange}
                            input={<OutlinedInput label="Name" />}
                            sx={{ mr: 1, mt: 2, width: 220 }}
                        >
                            {Array.isArray(author) &&
                                author.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Thể loại</InputLabel>
                        <Select
                            labelId="categoryName"
                            id="categoryName"
                            multiple
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            input={<OutlinedInput label="Name" />}
                            sx={{ mr: 1, mt: 2, width: 220 }}
                        >
                            {Array.isArray(category) &&
                                category.map((name) => {
                                    return (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                                name,
                                                currentCategory,
                                                theme
                                            )}
                                        >
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tên bộ sản phẩm</InputLabel>
                        <Select
                            labelId="productset"
                            id="productset"
                            onChange={handleProductsetChange}
                            input={<OutlinedInput label="Name" />}
                            sx={{ mr: 1, mt: 2, width: 220 }}
                        >
                            {Array.isArray(productSet) &&
                                productSet.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tên nhà xuất bản</InputLabel>
                        <Select
                            labelId="provider"
                            id="provider"
                            onChange={handleProviderChange}
                            input={<OutlinedInput label="Name" />}
                            sx={{ mr: 1, mt: 2, width: 220 }}
                        >
                            {Array.isArray(provider) &&
                                provider.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    {!edit && (
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                display: "block",
                            }}
                        >
                            Thêm
                        </Button>
                    )}
                    {edit && (
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, display: "block" }}
                        >
                            Sửa
                        </Button>
                    )}
                </Box>
            )}
            {type === "product-set" && (
                <Box
                    component="form"
                    onSubmit={handleAddData}
                    noValidate
                    sx={{ alignItems: "center" }}
                >
                    <TextField
                        margin="normal"
                        name="name"
                        label="Tên"
                        id="name"
                        value={productSetName ? productSetName : ""}
                        onChange={(e) => {
                            setProductSetName(e.target.value);
                        }}
                        sx={{ mr: 2, width: 350 }}
                    />
                    <TextField
                        margin="normal"
                        name="description"
                        label="Mô tả"
                        id="description"
                        value={productSetDescription ? productSetDescription : ""}
                        onChange={(e) => {
                            setProductSetDescription(e.target.value);
                        }}
                        sx={{ mr: 2, width: 350 }}
                    />
                    <TextField
                        margin="normal"
                        name="newestChap"
                        label="Tập mới nhất"
                        id="newestChap"
                        value={productSetNewestChap ? productSetNewestChap : ""}
                        onChange={(e) => {
                            setProductSetNewestChap(e.target.value);
                        }}
                        sx={{ mr: 2, width: 350 }}
                    />
                    <TextField
                        margin="normal"
                        name="image"
                        label="Ảnh"
                        id="image"
                        value={productSetImage ? productSetImage : ""}
                        onChange={(e) => {
                            setProductSetImage(e.target.value);
                        }}
                        sx={{ mr: 2, width: 350 }}
                    />
                    <FormControl sx={{ mt: 2, mr: 2, width: 350 }}>
                        <InputLabel>Tên tác giả</InputLabel>
                        <Select
                            labelId="authorName"
                            id="authorName"
                            onChange={handleAuthorChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {Array.isArray(author) &&
                                author.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mr: 2, width: 350 }}>
                        <InputLabel>Tên nhà xuất bản</InputLabel>
                        <Select
                            labelId="provider"
                            id="provider"
                            onChange={handleProviderChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {Array.isArray(provider) &&
                                provider.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    {!edit && (
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, display: "block" }}
                        >
                            Thêm
                        </Button>
                    )}
                    {edit && (
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, display: "block" }}
                        >
                            Sửa
                        </Button>
                    )}
                </Box>
            )}
            {type === "category" && (
                <Box component="form" onSubmit={handleAddData} noValidate>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Tên"
                        name="name"
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        margin="normal"
                        name="description"
                        label="Mô tả"
                        id="description"
                        sx={{ mr: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, display: "block" }}
                    >
                        Thêm
                    </Button>
                </Box>
            )}
            {type === "author" && (
                <Box component="form" onSubmit={handleAddData} noValidate>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Tên"
                        name="name"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, display: "block" }}
                    >
                        thêm
                    </Button>
                </Box>
            )}
            {type === "provider" && (
                <Box component="form" onSubmit={handleAddData} noValidate>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Tên"
                        name="name"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            display: "block",
                        }}
                    >
                        Thêm
                    </Button>
                </Box>
            )}
            {type === 'order' && orderMessage && (
                <Box component="form" onSubmit={handleAddData} noValidate>
                    <TextField
                        margin="normal"
                        name="detail"
                        label="Trạng thái"
                        id="detail"
                        value={orderStatus ? orderStatus : ""}
                        onChange={(e) => {
                            setOrderStatus(e.target.value);
                        }}
                        sx={{ mr: 2, width: 350 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            display: "block",
                        }}
                    >
                        Sửa
                    </Button>
                </Box>

            )}
            {message === "update-data" && (
                <Alert severity="success">Đã thêm dữ liệu mới</Alert>
            )}
            {message === "error-update-data" && (
                <Alert severity="warning">Lỗi khi thêm dữ liệu mới</Alert>
            )}
            {message === "change-data" && (
                <Alert severity="success">Đã cập nhật dữ liệu thành công</Alert>
            )}
            {message === "error-change-data" && (
                <Alert severity="warning">Lỗi khi cập nhật dữ liệu </Alert>
            )}
            {message === "update-payment" && (
                <Alert severity="success">
                    Đã xác nhận thanh toán cho đơn hàng
                </Alert>
            )}
            {message === "error-update-payment" && (
                <Alert severity="warning">
                    Lỗi khi xác nhận thanh toán cho đơn hàng
                </Alert>
            )}
            {message === "paymented" && (
                <Alert severity="warning">
                    Đơn hàng đã được xác nhận thanh toán trước đó
                </Alert>
            )}
            {message === "deleted-data" && (
                <Alert severity="success">Đã xóa dữ liệu thành công</Alert>
            )}
            {message === "error-deleted-data" && (
                <Alert severity="warning">Lỗi khi xóa dữ liệu</Alert>
            )}
            {message === "change-order" && (
                <Alert severity="success">Đã thay đổi trạng thái đơn hàng</Alert>
            )}
        </div>
    );
};

export default Table;
