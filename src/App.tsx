import { nanoid } from 'nanoid';
import React, {useState} from 'react';
import {Layout, Menu} from "antd"
import {useLocation, Link, Switch, Route} from "react-router-dom"
import { IMoviesProps } from './types';
import MyMovie from "./MyMovie"
import UpcomingMovies from "./UpcomingMovies"

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
      hasBeenWatched: false,
      image: "https://upload.wikimedia.org/wikipedia/id/3/34/N5M-POSTER-FIN.jpg",
      reasons: "waching for motivation",
      duration: 2,
      watchSchedule: 20
    },
    {
      id: nanoid(),
      title: "Black Clover Episode 161",
      hasBeenWatched: true,
      image: "https://www.inspiredtraveler.ca/wp-content/uploads/2020/09/Black-Clover.jpg",
      reasons: "Anime For Motivation",
      duration: 1,
      watchSchedule: 22
    },
    {
      id: nanoid(),
      title: "Kemono Jihen Episode 03 [Takarir Indonesia]",
      hasBeenWatched: false,
      image: "https://apps.owibu.com/berita/banner/1593657721anime-kemono-jihen-akan-tayang-2021.jpg",
      reasons: "Anime For Relax",
      duration: 1,
      watchSchedule: 10
    },
  ])

  //delete movie
  const handleDeleteMovie = (id: string) => {
    setMovies(movies.filter(movie => (
      movie.id !== id
    ))) 
  }

  //edit movie
  const handleEditMovie = (editedBook: IMoviesProps) => {
    setMovies(movies.map(movie => (
      movie.id === editedBook.id ? editedBook : movie
    )))
  }

  //add movie
  const handleAddMovie = (newBook: IMoviesProps) => {
    setMovies([...movies, newBook])
  }

  //adding to my movie page
  const handleWatched = (id: string) => {
    const tempMovie = [...movies]
    var index = tempMovie.findIndex(movie => (
      movie.id === id
    ))
    tempMovie[index].hasBeenWatched = true
    setMovies(tempMovie)
  }



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
              onDeleteMovie={handleDeleteMovie}
              onEditMovie={handleEditMovie}
            />
         </Route>
         <Route path="/upcomingmovies">
           <UpcomingMovies 
              movies={movies}
              onAddMovie={handleAddMovie}
              onWatched={handleWatched}
           />
         </Route>
       </Switch>
     </Layout.Content>
     <Layout.Footer style={{textAlign: "center"}}>Watch Schedule 2021 | created by yukafi.dev</Layout.Footer>
   </Layout>
  );
}

export default App;
