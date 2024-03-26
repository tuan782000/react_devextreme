import axios from "axios";
import handleError from "../Helpers/ErrorHandler.jsx"

const api = "http://localhost:5020/api/"

// http://localhost:5020/api/product?ProductName=Product_02&SortBy=name&IsDecsending=true&PageNumber=10&PageSize=1
export const getProduct = async (ProductName, SortBy, IsDecsending, PageNumber, PageSize) => {
    try {
        const data = await axios.get(api + `product?${ProductName}&${SortBy}&${IsDecsending}&${PageNumber}&${PageSize}`)
        return data
    } catch (error) {
        handleError(error);
    }

}
export const getProductById = async (id) => {
    try {
        const data = await axios.get(api + `product/${id}`)
        return data
    } catch (error) {
        handleError(error);
    }
}

// http://localhost:5020/api/product

export const createProduct = async (name, price, thumbnail, description, active) => {
    try {
        const data = await axios.post(api + `product`, {
            name: name,
            price: price,
            thumbnail: thumbnail,
            description: description,
            active: active
        })
        return data
    } catch (error) {
        handleError(error);
    }
}

export const updateProduct = async (id, name, price, thumbnail, description, active) => {
    try {
        const data = await axios.put(api + `product/${id}`, {
            name: name,
            price: price,
            thumbnail: thumbnail,
            description: description,
            active: active
        })
        return data
    } catch (error) {
        handleError(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const data = await axios.delete(api + `product/HardDelete/${id}`)
        return data
    } catch (error) {
        handleError(error);
    }
}

export const softDelete = async (id) => {
    try {
        const data = await axios.delete(api + `product/SoftDelete/${id}`)
        return data
    } catch (error) {
        handleError(error);
    }
}



const CommentService = () => {
    return (
        <div>CommentService</div>
    )
}

export default CommentService