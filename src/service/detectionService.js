import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function predictDisease(imageFile) {

    const formData = new FormData();

    formData.append(
        "file",
        imageFile
    );


    try {

        const response = await axios.post(
            `${BASE_URL}/api/disease/predict`,
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );

console.log(response.data);

        return response.data;


    } catch(error){

        console.error(
            "Prediction failed:",
            error
        );

        throw error;
    }
}