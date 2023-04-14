import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import "./AddData.css"
const XLSX = require('xlsx');

async function readExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsBinaryString(file);
    });
  }

async function uploadData(credentials) {
    console.log(credentials);
    if (credentials) {
        let url = `${process.env.REACT_APP_SV_HOST}/models/product/upload/`;
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
        })
        .then((data) => data.json());
        return data;
    }
}
    function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = async (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
          try {
            const jsonData = await readExcelFile(selectedFile);
            let response = await uploadData(jsonData);
          } catch (error) {
            console.log(error);
          }
        }
      };
      

  return (
        <Box className="box">
        <Header />
        <Box>
            <input
            className="upload-input"
            type="file"
            accept=".xlsx"
            onChange={handleFileSelect}
            />
            <Button variant="contained" onClick={handleUploadClick}>
            Upload
            </Button>
        </Box>
        </Box>
  );
}

export default FileUpload;
