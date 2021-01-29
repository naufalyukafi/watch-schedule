import React, {useState} from 'react'
import {Row, Col, Button, Typography, Upload, message } from "antd"
import { UploadOutlined  } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import axios from "axios"


const UploadMovie = () => {
    const [item, setItem] = useState("");
    const [folderId, setFolderId] = useState("1HiWqwX8a4Blgidu3TKyIR2dzCIM1VDry")
    const [data, setData] = useState()
    
    const handleItem = async () => {
        const formData = new FormData()
        formData.append('item', item)
        formData.append("folderId", folderId)

        await fetch("https://staging-gdrive-api-web-aca.herokuapp.com/upload", {
            method: 'POST',
            body: formData
        })
        alert("success")
    }
    return (
        <div style={{height: "100vh"}}>
            <Typography.Title level={4}>Upload Your Favorit Movie to Google Drive: </Typography.Title>
            <input type="file" name="picture" onChange={e => setItem(e.target.files[0])} />
            <button onClick={handleItem}>Submit</button>
        </div>
    )
}

export default UploadMovie
