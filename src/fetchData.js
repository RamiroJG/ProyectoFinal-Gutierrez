import { productos } from "./productosDestacados"

export const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(productos);
    }, 5000);
});

export default fetchData