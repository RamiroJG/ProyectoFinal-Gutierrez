import akatsukiImg from './assets/img/naruto_modo_sabio.webp';
import sasukesusanoo from './assets/img/sasukesusanoo.jpg';
import sudaderahokage from './assets/img/sudaderahokage.webp';
import collartsunade from './assets/img/collartsunade.webp';
import setkunai from './assets/img/setkunai.jpg';

export const productos = [
    {
        id: 1,
        name: "Figura de Acción Naruto Modo Sabio",
        category: "figures",
        price: 59.99,
        rating: 4.8,
        image: akatsukiImg,
        isBestseller: true,
        stock: 15,
    },
    {
        id: 2,
        name: "Figura Sasuke Uchiha Susanoo",
        category: "figures",
        price: 69.99,
        rating: 4.9,
        image: sasukesusanoo,
        isNew: true,
        stock: 8,
    },
    {
        id: 3,
        name: "Sudadera Hokage Negro",
        category: "clothing",
        price: 49.99,
        rating: 4.6,
        image: sudaderahokage,
        stock: 25,
    },
    {
        id: 4,
        name: "Collar de Tsunade",
        category: "accessories",
        price: 24.99,
        rating: 4.5,
        image: collartsunade,
        stock: 30,
    },
    {
        id: 5,
        name: "Set de Kunai (3 piezas)",
        category: "collectibles",
        price: 34.99,
        discountPrice: 29.99,
        rating: 4.7,
        image: setkunai,
        isNew: true,
        stock: 40,
    },
]