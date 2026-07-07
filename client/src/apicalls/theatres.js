import { axiosInstance } from ".";

// Add a new theatre
export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/add-theatre",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get all theatres
export const GetAllTheatres = async () => {
    try {
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


//update theatre
export const UpdateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/update-theatre",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// Delete theatre
export const DeleteTheatre = async (payload) => {
 try {
   const response = await axiosInstance.post(
     "/api/theatres/delete-theatre",
     payload
   );

   return response.data;
 } catch (error) {
   return error.response;
 }
};

// add show
export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/add-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get all shows
export const GetAllShowsByTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/get-all-shows-by-theatre",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// delete show
export const DeleteShow = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/delete-show",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
};


// import { axiosInstance } from ".";

// // Add Theatre
// export const AddTheatre = async (payload) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/theatres/add-theatre",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// // Update Theatre
// export const UpdateTheatre = async (payload) => {
//   try {
//     const response = await axiosInstance.put(
//       "/api/theatres/update-theatre",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.response;
//   }
// };

// // Delete Theatre
// export const DeleteTheatre = async (payload) => {
//   try {
//     const response = await axiosInstance.delete(
//       "/api/theatres/delete-theatre",
//       {
//         data: payload,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// // Get all theatres
// export const GetAllTheatres = async () => {
//   try {
//     const response = await axiosInstance.get(
//       "/api/theatres/get-all-theatres"
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// // Get theatres by owner
// export const GetAllTheatresByOwner = async (payload) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/theatres/get-all-theatres-by-owner",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// // update theatre
// // export const UpdateTheatre = async (payload) => {
// //     try {
// //         const response = await axiosInstance.post(
// //             "/api/theatres/update-theatre",
// //             payload
// //         );
// //         return response.data;
// //     } catch (error) {
// //         return error.response;
// //     }
// // };