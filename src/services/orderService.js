import axios from "axios";

const ordersURL = "http://localhost:3000/orders";

export const getOrders = async (userId) => {
    const response = await axios.get(`${ordersURL}?userId=${userId}`);
    return response.data;
};

export const createOrder = async (order) => {
    const response = await axios.post(ordersURL, order);
    return response.data;
};
export const cancelOrder=async(orderId)=>{
const response=await axios.patch(`${ordersURL}/${orderId}`,{status:"Cancelled"});
return response.data;
};