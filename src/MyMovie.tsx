import React from 'react'
import {Row, Col, List, Card} from "antd"
import { IMyMovieProps } from './types'

const MyMovie = ({movies} : IMyMovieProps) => {
    return (
        <Row>
            <List 
                grid={{
                    gutter: 4,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 3,
                }}
                size="large"
                pagination={{pageSize: 8}}
                dataSource={movies}
                renderItem={movie => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt="cover" height={350} src={movie.image} />}
                        >Card content</Card>
                    </List.Item>
                    
                )}
            />
        </Row>
    )
}

export default MyMovie
