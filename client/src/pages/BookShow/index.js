import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { GetShowById } from '../../apicalls/theatres'
import moment from 'moment'

function BookShow() {
    const [show , setShow] = React.useState(null)
    const [selectedSeats, setSelectedSeats] = React.useState([])
    const params = useParams()
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetShowById({
                showId: params.id,
            });
            if(response.success){
                setShow(response.data);
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch(error) {
            dispatch(HideLoading());
            message.error(error.message);      
        }
    };

    const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns)

    return (
        <div className="flex gap-1 flex-col p-2 card">
            {Array.from(Array(rows).keys()).map((seat, index) => {
                return (
                    <div className="flex gap-1 justify-center">
                        {Array.from(Array(columns).keys()).map((column, index) => {

                           const seatNumber = seat * columns + column + 1;
                           let seatClass = "seat";

                           if (selectedSeats.includes(seat * columns + column + 1)) {
                           seatClass = seatClass + " selected-seat";
                           }

                           if (show.bookedSeats.includes(seat * columns + column + 1)) {
                           seatClass = seatClass + "booked-seat";
                           }

                           return (
                           seat * columns + column + 1 <= totalSeats && (
                           <div className={seatClass}
                                onClick={() => {
                                    const seatNumber = seat * columns + column + 1;
                                    if (selectedSeats.includes(seatNumber)) {
                                    setSelectedSeats(
                                             selectedSeats.filter((item) => item !== seatNumber)
                                    );
                                    } else {
                                    setSelectedSeats([...selectedSeats, seatNumber]);
                                    }
                           }}
                                >
                                    <h1 className="text-sm">{seat * columns + column + 1}</h1>
                                </div>
                           )
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};



    useEffect(() => {
        getData();
    }, [])

    // ==========================================
    // FIX CODE: Loading guard clause 
    // This stops the crash while data is fetching
    // ==========================================
    if (!show) {
        return null; // Or return a spinner like: <div>Loading Show Details...</div>
    }

    return (
        show && <div>
            {/* show information */}
            <div className="flex justify-between card p-2 items-centre">
                <div>
                    <h1 className="text-xl">{show.theatre.name}</h1>
                    <h1 className="text-sm">{show.theatre.address}</h1>
                </div>

                <div>
                    <h1 className="text-2xl uppercase">
                        {show.movie.title} ({show.movie.language})
                    </h1>
                </div>

                <div>
                    <h1 className="text-xl">
                        {moment(show.date).format("MMM Do YYYY")} - {moment(show.time, "HH:mm").format("hh:mm A")}
                    </h1>
                </div>
            </div>

            {/* seats */}
            <div className="flex justify-center mt-2 p-3">
                {getSeats()}
            </div>
        </div>
    )
}

export default BookShow;