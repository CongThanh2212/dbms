import * as React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { default as MuiMenu } from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenMenu = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    let list = ["hot", "new", 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let listName = [
        "TRUYỆN HOT",
        "TRUYỆN MỚI",
        "VĂN HỌC",
        "MANGA-COMIC",
        "LIGHT NOVEL",
        "NGÔN TÌNH",
        "TRUYỆN NGẮN",
        "TÂM LÝ",
        "TIỂU THUYẾT",
        "KINH TẾ",
        "HÀNH ĐỘNG",
        "VIỄN TƯỞNG",
        "NGHỆ THUẬT - GIẢI TRÍ",
        "HÀNH ĐỘNG",
        "PHIÊU LƯU",
        "TRINH THÁM",
    ];
    let array4 = [0, 1, 2, 3];
    return (
        <div>
            <IconButton
                className="button-menu"
                size="large"
                edge="start"
                aria-label="menu"
                aria-owns={open ? "menu" : undefined}
                aria-haspopup={open ? "true" : "false"}
                aria-controls={open ? "menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenMenu}
            >
                <MenuIcon />
                <MuiMenu
                    id="menu"
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handleCloseMenu}
                    disableRestoreFocus
                >
                    <Grid container columns={4} className="box grid">
                        {array4.map((index1) => (
                            <Grid item xs={1} className="box">
                                {array4.map((index2) => (
                                    <MenuItem
                                        className="box item"
                                        onClick={
                                            (handleCloseMenu,
                                            () =>
                                                navigate(
                                                    `/product-category/?id=` +
                                                        list[
                                                            index1 * 4 + index2
                                                        ]
                                                ))
                                        }
                                    >
                                        {listName[index1 * 4 + index2]}
                                    </MenuItem>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </MuiMenu>
            </IconButton>
        </div>
    );
}
