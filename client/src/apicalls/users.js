const {axiosInstance} = require(".");

// Register a new user

export const RegisterUser = async (payload)=>{
         try {
                  const response = await axiosInstance.post("/api/users/register", payload);
                  return response.data;
         } catch (error) {
                  //return error.response;
                   return error.response?.data || { success: false, message: error.message };
         }
};

// Login a user

export const LoginUser = async (payload) => {
         try {
                  const response = await axiosInstance.post("/api/users/login", payload);
                  return response.data;
                  
         } catch (error) {
                  //return error.response;
                   return error.response?.data || { success: false, message: error.message };
         }
}

// get current user
// get current user
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        // Return the actual JSON payload sent by your authmiddleware catch block
        return error.response?.data || { success: false, message: error.message };
    }
}
