import axios from 'axios';

export const addReview= async (_id, newReview) => {
    try {
        const response = await axios.put (`http://localhost:8080/movie/add/review/${_id}`, newReview);
        console.log(response);
        
    } catch (error) {
        console.log(error);
    }
};