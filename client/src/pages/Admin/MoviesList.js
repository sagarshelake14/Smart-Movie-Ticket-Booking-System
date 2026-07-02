import React, { useEffect } from 'react'
import  Button  from '../../components/Button'
import MoviesForm from './MoviesForm';
import moment from 'moment'
import { message, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetAllMovies } from '../../apicalls/movies';
import { DeleteMovie } from '../../apicalls/movies';

function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModel, setShowMovieFormModel] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  

  const dispatch = useDispatch();
  const getData = async () => {
      try {
          dispatch(ShowLoading());
          const response = await GetAllMovies();
          if(response.success){
            setMovies(response.data);
          }else{
            message.error(response.message);
          }
          dispatch(HideLoading());
      } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
      }
  }

 const handleDelete = async (movieId) => {
    try {
        dispatch(ShowLoading());
        const response = await DeleteMovie({
            movieId,
        });
        if (response.success) {
            message.success(response.message);
            getData();
        } else {
            message.error(response.message);
        }
        dispatch(HideLoading());
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
}

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img 
            src={record.poster} 
            alt="poster" 
            height='60'
            width='80'
            className='br-1'
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render : (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      }
    },
    {
      title:"Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div class="flex gap-1">
          <i class="ri-delete-bin-line"
          onClick={()=>{
            handleDelete(record._id);
          }}
          ></i>
          <i class="ri-pencil-line"
          onClick={()=>{
              setSelectedMovie(record)
              setFormType("edit");
              setShowMovieFormModel(true);
          }}
          ></i>
        </div>
      },
    },
  ]

  useEffect(()=>{
    getData();
  }, [])

  return (
    <div>
         <div className="flex justify-end mb-1">
                  <Button title="Add Movie"variant="outlined" 
                           onClick={()=>{
                                    setShowMovieFormModel(true)
                                    setFormType("add")
                           }}
                  />
         </div>    

         <Table columns={columns} dataSource={movies} />             

         {showMovieFormModel && (<MoviesForm
                  showMovieFormModel={showMovieFormModel}
                  setShowMovieFormModel={setShowMovieFormModel}
                  selectedMovie= {selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                  formType={formType}
                  getData= {getData}
                />
          )}

    </div>
  )
}

export default MoviesList