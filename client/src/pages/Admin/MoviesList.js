import React from 'react'
import  Button  from '../../components/Button'
import MoviesForm from './MoviesForm';

function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModel, setShowMovieFormModel] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");

  return (
    <div>
         <div className="flex justify-end">
                  <Button title="Add Movie"variant="outlined" 
                           onClick={()=>{
                                    setShowMovieFormModel(true)
                                    setFormType("add")
                           }}
                  />
         </div>


         {showMovieFormModel && <MoviesForm
                  showMovieFormModel={showMovieFormModel}
                  setShowMovieFormModel={setShowMovieFormModel}
                  selectedMovie= {selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                  formType={formType}
         />}

    </div>
  )
}

export default MoviesList