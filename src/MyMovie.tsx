import React, {useState} from 'react'
import {
    Row, 
    Col, 
    List, 
    Card, 
    Typography, 
    Input as AntdInput, 
    Button,
    Modal,
    Form,
    InputNumber,
    Pagination
} from "antd"
import { IMoviesProps, IMyMovieProps } from './types'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormLayout } from 'antd/lib/form/Form'

const MyMovie = ({movies, onDeleteMovie, onEditMovie} : IMyMovieProps) => {
    const [searchValue, setSearchValue] = useState<string>("")
    
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
    
    const [selectedMovie, setSelectedMovie] = useState<IMoviesProps | null>(null)

    const [titleValue, setTitleValue] = useState<string>("")
    const [imageValue, setImageValue] = useState<string>("")
    const [durationValue, setDurationValue] = useState<number>(0)
    const [reasonsValue, setReasonsValue] = useState<string>("")
    const [watchScheduleValue, setWathcScheduleValue] = useState<number>(0)

    const [formLayout, setFormLayout] = useState<FormLayout>("vertical");

    const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    const filteredMovie = movies.filter(movie => (
        movie.title.toLowerCase().includes(searchValue.toLowerCase()) && movie.hasBeenWatched
    ))

    const showModal = () => {
        setIsModalVisible(prev => !prev)
    }
    const showModalEdit = () => {
        setIsModalEditVisible(prev => !prev)
    }

    const showOpenModal = (movie : IMoviesProps) => {
        setSelectedMovie(movie)
        setIsModalVisible(true)    
    }

    const handleDeleteMovie = (id: string) => {
        onDeleteMovie(id)
        setIsModalVisible(false)
        setSelectedMovie(null)
    }

    const handleShowEditModal = () => {
        setFormLayout("horizontal")
        setIsModalEditVisible(true)
        if(selectedMovie){
            setTitleValue(selectedMovie.title)
            setImageValue(selectedMovie.image)
            setDurationValue(selectedMovie.duration)
            setReasonsValue(selectedMovie.reasons)
            setWathcScheduleValue(selectedMovie.watchSchedule)
        }
    }

    const handleEditMovie = () => {
        const editedMovie = {
            id: selectedMovie?.id ?? "",
            title: titleValue,
            image: imageValue,
            duration: durationValue,
            reasons: reasonsValue,
            watchSchedule: watchScheduleValue,
            hasBeenWatched: true
        }
        onEditMovie(editedMovie)
        setSelectedMovie(editedMovie)
        setIsModalEditVisible(false)
    }

    const formItemLayout =
    formLayout === 'vertical'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

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

    return (
        <>
        <Row align="middle" style={{marginBottom: 20}}>
                <Col style={{marginRight: 10}}>
                    <Typography.Title level={3}>My Movie </Typography.Title>
                </Col>
                <Col>     
                    <AntdInput
                        style={{width: "100%"}}
                        placeholder="Searching ..."
                        allowClear
                        size="large"
                        onChange={handleSearchValue}
                        value={searchValue}
                    />  
                </Col>
            </Row>
        <Row> 
            <List 
                grid={{
                    gutter: 4,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 5,
                }}
                pagination={{pageSize: 8}}
                size="large"
                dataSource={filteredMovie}
                renderItem={movie => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt="cover" height={350} src={movie.image} style={{objectFit: "cover"}}  />}
                            actions={[
                                <DeleteOutlined key="delete" onClick={() => handleDeleteMovie(movie.id)} />,
                                <EyeOutlined onClick={() => showOpenModal(movie)} />
                              ]}
                        >
                            <Typography.Text style={{textAlign: "center"}}>{movie.title}</Typography.Text> 
                        </Card>
                        
                    </List.Item>
                )}
                
            />
            <Modal
                visible={isModalVisible}
                onOk={showModal}
                onCancel={showModal}
            >
                {selectedMovie && 
                <>
                    <img height={350} width={250} src={selectedMovie.image} alt={selectedMovie.title} style={{objectFit: "cover"}} />
                    <Typography.Title level={4}>Title: {selectedMovie.title}</Typography.Title>
                    <Typography.Title level={4}>Duration: {selectedMovie.duration} jam</Typography.Title>
                    <Typography.Title level={4}>Reations: {selectedMovie.reasons}</Typography.Title>
                    <Typography.Title level={4}>Watch Schedule: {selectedMovie.watchSchedule}</Typography.Title>
                    <Button type="primary" danger style={{marginRight: 5}} onClick={() => handleDeleteMovie(selectedMovie.id)}>Delete</Button>
                    <Button type="primary" onClick={handleShowEditModal}>Edit</Button>
                </>
                }
            </Modal>
            <Modal
                visible={isModalEditVisible}
                onOk={showModalEdit}
                onCancel={showModalEdit}
                title={selectedMovie?.title}

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
                    <Form.Item>
                        <Button type="primary" onClick={handleEditMovie}>Edit Movie</Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/* <Pagination defaultCurrent={1} pageSize={1} total={50} /> */}
        </Row>
        </>
    )
}

export default MyMovie
