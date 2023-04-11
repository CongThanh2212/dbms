import React from 'react';
import Header from '../../components/Header/Header';
import Box from '@mui/material/Box';
import './OrderDetail.css'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
            <Typography component={'span'}>{children}</Typography>
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function JsonDataDisplay() {
    let data = JSON.parse(sessionStorage.getItem('orderdetail'));
	const DisplayData = data.map(
		(info)=>{
			return(
				<tr>
					<td>{info.productName}</td>
					<td>{info.orderNumber}</td>
					<td>{info.price}</td>
				</tr>
			)
		}
	)

	return(
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value = {0} aria-label="user tabs">
                    <Tab label="Thông tin đơn hàng" />
                </Tabs>
                <TabPanel value={0} index={0}>
                    <div>
                        <table class="table-data">
                            <thead>
                                <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá / 1 quyển</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DisplayData}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                </Box>
            </Box>
        </Box>
	)
}

export default JsonDataDisplay;
