import api from "../constant/api";


export async function predictDisease(imageFile) {

    const formData = new FormData();

    formData.append(
        "file",
        imageFile
    );


    try {

        const response = await api.post(
            "/api/disease/predict",
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
export async function getDetectionByUserId() {

    const res = await api.get(`/api/disease/byuser/${localStorage.getItem("email")}`);

    console.log(res.data);

    return res.data;
}