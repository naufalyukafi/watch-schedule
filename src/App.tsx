import { nanoid } from 'nanoid';
import React, {useState} from 'react';
import {Layout, Menu} from "antd"
import {useLocation, Link, Switch, Route} from "react-router-dom"
import { IMoviesProps } from './types';
import MyMovie from "./MyMovie"

function App() {
  const [movies, setMovies] = useState<IMoviesProps []>([
    {
      id: nanoid(),
      title: "Dari Jendela SMP Episode 271",
      hasBeenWatched: true,
      image: "https://asset.kompas.com/crops/auDDLO7VG_hYIHDkYF1RGpWzcBw=/128x85:1152x768/750x500/data/photo/2020/07/02/5efdbf3be0708.jpeg",
      reasons: "My favorit sinetron in 2020-2021",
      duration: 1,
      watchSchedule: 18
    },
    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },

    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },

    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },

    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },

    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },

    {
      id: nanoid(),
      title: "Negeri 5 Menara Web Series",
      hasBeenWatched: true,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },
  ])
  const {pathname} = useLocation()
  return (
   <Layout>
     <Layout.Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
          <Menu.Item key="/mymovie">
            <Link to="/mymovie"> My Movie</Link>
          </Menu.Item>
          <Menu.Item key="/upcomingmovies">
            <Link to="/upcomingmovies">Upcoming Movies</Link>
          </Menu.Item>
        </Menu>
     </Layout.Header>
     <Layout.Content style={{ padding: '20px 50px' }}>
       <Switch>
         <Route path="/mymovie">
           <MyMovie 
              movies={movies}
            />
         </Route>
       </Switch>
     </Layout.Content>
     <Layout.Footer style={{textAlign: "center"}}>Watch Schedule 2021 | created by yukafi.dev</Layout.Footer>
   </Layout>
  );
}

export default App;
