export interface IMoviesProps {
    id: string,
    title: string,
    image: string,
    duration: number,
    reasons: string,
    watchSchedule: number,
    hasBeenWatched: boolean
}

export interface IMyMovieProps {
    movies: IMoviesProps[],
    onDeleteMovie: (id: string) => void,
    onEditMovie: (value: IMoviesProps) => void
}