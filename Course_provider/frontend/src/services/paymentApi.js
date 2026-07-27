import api from "./api";

export const createOrder = async (courseId) => {
    const response = await api.post("payments/create-order/",{
        course_id: courseId,
    });

    return response.data;
};