import React from 'react'
import { Modal, Form, Col, Row, message } from 'antd'
import Button from '../../components/Button';
import {useDispatch} from "react-redux"
import {HideLoading, ShowLoading} from "../../redux/loadersSlice"
import { AddMovie } from '../../apicalls/movies';

function MoviesForm({
         showMovieFormModel,
         setShowMovieFormModel,
         selectedMovie,
         setSelectedMovie,
         formType
}) {
const dispatch = useDispatch();
const onFinish = async (values) => {
         try {
                  dispatch(ShowLoading());
                  let response = null
                  if(formType === "add"){
                           response = await AddMovie(values);
                  }else{

                  }

                  if(response.success){
                           message.success(response.message);
                           setShowMovieFormModel(false)
                  }
                  else{
                           message.error(response.message);
                  }
                  dispatch(HideLoading());
         } catch (error) {
                dispatch(HideLoading())
                message.error(error.message);
         }
};
  return (
    <Modal
         title={formType === "add" ? "Add Movie" : "Edit Movie"}
         open={showMovieFormModel}
         onCancel={()=> setShowMovieFormModel(false)}
         footer={null}
         width={800}
    >
         <Form
         layout='vertical'
         onFinish={onFinish}
         >
                  <Row gutter={16}>
                           <Col span={24}>
                                    <Form.Item label="Movie Name"
                                    name="title"
                                    >
                                             <input type="text" />
                                    </Form.Item>
                           </Col>
                           <Col span={24}>
                                    <Form.Item label="Movie Description"
                                    name="description"
                                    >
                                             <textarea type="text" />
                                    </Form.Item>
                           </Col>
                           <Col span={8}>
                                    <Form.Item label="Movie Duration"
                                    name="duration"
                                    >
                                             <input type="text" />
                                    </Form.Item>
                           </Col>
                           <Col span={8}>
                                    <Form.Item label="Language"
                                    name="language"
                                    >
                                             <select name="" id="">
                                                      <option value="">Select Language</option>
                                                      <option value="English">English</option>
                                                      <option value="Hindi">Hindi</option>
                                                      <option value="Marathi">Marathi</option>
                                                      <option value="Telegu">Telegu</option>
                                             </select>
                                    </Form.Item>
                           </Col>
                           <Col span={8}>
                                    <Form.Item label="Movie Release Date"
                                    name="releaseDate"
                                    >
                                             <input type="date" />
                                    </Form.Item>
                           </Col>
                           <Col span={8}>
                                    <Form.Item label="Genre"
                                    name="genre"
                                    >
                                             <select name="" id="">
                                                      <option value="">Select Genre</option>
                                                      <option value="Action">Action</option>
                                                      <option value="Comedy">Comedy</option>
                                                      <option value="Drama">Drama</option>
                                                      <option value="Romance">Romance</option>
                                             </select>
                                    </Form.Item>
                           </Col>
                           <Col span={16}>
                                    <Form.Item label="Poster URL"
                                    name="poster"
                                    >
                                             <input type="text" />
                                    </Form.Item>
                           </Col>

                  </Row>

                  <div className="flex justify-end gap-1">
                           <Button title='Cancel' variant='outlined' type='button'
                           onClick={()=>setShowMovieFormModel(false)}
                           />
                           <Button title='Save' type='submit' />
                  </div>

         </Form>
    </Modal>
  )
}

export default MoviesForm