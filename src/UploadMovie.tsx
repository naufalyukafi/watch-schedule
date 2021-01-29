import React from 'react'
import {Row, Col, Button, Typography, Upload, message } from "antd"
import { UploadOutlined  } from '@ant-design/icons';
import { useForm } from 'react-hook-form';


const UploadMovie = () => {
    const {register, handleSubmit} = useForm()
    
    const onSubmit = async (data: any) => {
        const formData = new FormData()
        formData.append("picture", data.picture[0])


        const res = await fetch("https://staging-gdrive-api-web-aca.herokuapp.com/upload", {
            method: "POST",
            // body: {item: formData, folderId: "1HiWqwX8a4Blgidu3TKyIR2dzCIM1VDry"}
        }).then(res => res.json())
        alert(JSON.stringify(res))
    }
    return (
        <div style={{height: "100vh"}}>
            <Typography.Title level={4}>Upload Your Favorit Movie to Google Drive: </Typography.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input ref={register} type="file"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UploadMovie
