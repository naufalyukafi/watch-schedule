import React, { useState } from "react";
import {
  Input as AntdInput,
  Button,
  Modal,
  Form,
  List,
  InputNumber,
  Row, 
  Col,
  Typography
} from "antd";
import { FormLayout } from "antd/lib/form/Form";
import { IUpcomingMoviesProps } from "./types";
import { nanoid } from "nanoid";

const UpcomingMovies = ({movies, onAddMovie, onWatched}: IUpcomingMoviesProps) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const [formLayout, setFormLayout] = useState<FormLayout>("vertical");

    const [titleValue, setTitleValue] = useState<string>("")
    const [imageValue, setImageValue] = useState<string>("")
    const [durationValue, setDurationValue] = useState<number>(0)
    const [reasonsValue, setReasonsValue] = useState<string>("")
    const [watchScheduleValue, setWathcScheduleValue] = useState<number>(0)

    const showAddModal = () => {
        setFormLayout("horizontal")
        setIsModalVisible(true)
    }
    const handleAddModal = () => {
        setIsModalVisible(prev => !prev)
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value)
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageValue(event.target.value)
    }
    const handleDurationChange = (value: string | number | null | undefined) => {
        if(typeof value === "number") setDurationValue(value)
    }
    const handleReasonsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReasonsValue(event.target.value)
    }
    const handleWatchChange =  (value: string | number | null | undefined) => {
        if(typeof value === "number") setWathcScheduleValue(value)
    }

    const handleAddNewMovie = () => {
        onAddMovie({
            title: titleValue,
            image: imageValue,
            duration: durationValue,
            id: nanoid(),
            hasBeenWatched: false,
            reasons: reasonsValue,
            watchSchedule: watchScheduleValue
        })
        setIsModalVisible(false)
    }

    const formItemLayout =
    formLayout === 'vertical'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
    
    return (
        <div>
        <Row>
            <Col style={{marginRight: 8}}>
                <Typography.Title level={3}>Would You Like To Watch A New Movie?</Typography.Title>
            </Col>
            <Col>
                <Button type="primary" danger onClick={showAddModal}>Watch a new movie</Button>
            </Col>
        </Row>
            <List
                pagination={{pageSize: 3}}
                dataSource={movies.filter(movie => !movie.hasBeenWatched)}
                renderItem={movie => (
                    <Row align="middle" style={{marginTop: 5}}>
                        <Col style={{marginRight: 8}}>
                            <img src={movie.image} height={350} width={200} alt={movie.title} style={{objectFit: "cover"}} />
                        </Col>
                        <Col>
                            <Typography.Title level={4}>Title: {movie.title}</Typography.Title>
                            <Typography.Title level={4}>Durasi: {movie.duration} Jam</Typography.Title>
                            <Typography.Title level={4}>Reasons: {movie.reasons}</Typography.Title>
                            <Typography.Title level={4}>Watch Schedule: {movie.watchSchedule}.00 PM</Typography.Title>
                            <Button type="primary" danger onClick={() => onWatched(movie.id)} >Done</Button>
                        </Col>
                    </Row>
                    )}
                />
            <Modal
                title="Add New Movie"
                visible={isModalVisible}
                onCancel={handleAddModal}
                footer={[
                    <Button key="back" onClick={handleAddModal}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddNewMovie}>
                      Submit
                    </Button>,
                  ]}
            >
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                >
                    <Form.Item label="Title" htmlFor="Title">
                        <AntdInput
                            value={titleValue}
                            allowClear
                            onChange={handleTitleChange}
                            id="Title"
                        />
                    </Form.Item>
                    <Form.Item label="Image" htmlFor="Image">
                        <AntdInput
                            value={imageValue}
                            allowClear
                            onChange={handleImageChange}
                            id="Image"
                        />
                    </Form.Item>
                    <Form.Item label="Duration" htmlFor="Duration">
                        <InputNumber 
                            value={durationValue}
                            onChange={handleDurationChange}
                            id="Duration"
                        />
                    </Form.Item>
                    <Form.Item label="Reasons" htmlFor="Reasons">
                        <AntdInput
                            allowClear
                            value={reasonsValue}
                            onChange={handleReasonsChange}
                            id="Reasons"
                        />
                    </Form.Item>
                    <Form.Item label="Watch Schedule" htmlFor="Watch Schedule">
                        <InputNumber 
                            value={watchScheduleValue}
                            onChange={handleWatchChange}
                            id="Watch Schedule"
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <Button type="primary"  htmlType="submit" onClick={() => handleAddNewMovie}>Add</Button>
                    </Form.Item> */}
                </Form>

            </Modal>
        </div>
    )
}

export default UpcomingMovies
