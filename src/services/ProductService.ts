import axios from "axios";
import { IProduct } from "../interfaces/IProduct";

class ProductService {
    private static commonHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    static async index() {
        const res = await axios.get('/api/products', {
            headers: this.commonHeaders
        });

        return res;
    }

    static async store(product: IProduct) {
        const res = await axios.post('/api/products', {
            ...product,
            headers: this.commonHeaders,
        });

        return res;
    }

    static async show(id: number) {
        const res = await axios.get(`/api/products/${id}`, {
            headers: this.commonHeaders,
        });

        return res;
    }

    static async update(product: IProduct) {
        const res = await axios.put(`/api/products/${product.id!}`, {
            ...product,
            headers: this.commonHeaders
        });

        return res;
    }

    static async destroy(id: number) {
        const res = await axios.delete(`/api/products/${id}`, {
            headers: this.commonHeaders
        });

        return res;
    }
}

export default ProductService;