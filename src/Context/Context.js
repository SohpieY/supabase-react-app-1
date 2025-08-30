import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";


const Cart = createContext();

// Your actual artwork data from CSV (converted to JavaScript array)
const products = [
    {
        id: "0f3a600f-440c-4888-a71f-1cd7028eb812",
        name: "Memory Threads",
        price: 10000,
        image: "/images/artwork/AW1_apples_mainpage.png",
        inStock: 7,
        fastDelivery: false,
        ratings: 4,
        category: "Mixed Media",
        medium: "Fabric",
        description: "For my painting inspired by Gustav Klimt, focusing on childhood nostalgia, growth, and change..."
    },
    {
        id: "1b607eb6-aa9f-47a2-96b9-ace61500ddae",
        name: "Roots and Branches",
        price: 15000.40,
        image: "/images/artwork/AW13_cabinet_painting.png",
        inStock: 5,
        fastDelivery: true,
        ratings: 5,
        category: "Painting",
        medium: "Oil Paint",
        description: "The artwork explores themes of memory, cultural identity, and the personal significance we attach to everyday objects..."
    },
    {
        id: "29543de7-8b7c-4363-868a-179d67e4f778",
        name: "Deflowering",
        price: 0,
        image: "/images/artwork/AW7_flowers_mainpage.png",
        inStock: 6,
        fastDelivery: false,
        ratings: 4,
        category: "Painting",
        medium: "Oil Paint",
        description: "This expressive abstract painting explores the fluid dynamics of natural forms..."
    },
    {
        id: "4919757c-701b-44e1-8955-f2fa2f1b0efc",
        name: "Scraped Knees",
        price: 0,
        image: "/images/artwork/AW2_thread_mainpage.png",
        inStock: 3,
        fastDelivery: true,
        ratings: 5,
        category: "Painting",
        medium: "Oil Paint",
        description: "For my painting inspired by Gustav Klimt, focusing on childhood nostalgia, growth, and change..."
    },
    {
        id: "57ab7f50-3912-4666-a97e-722aee5edae8",
        name: "Hung Fishes",
        price: 0,
        image: "/images/artwork/AW12_fishes_mixedmedia.png",
        inStock: 4,
        fastDelivery: false,
        ratings: 3,
        category: "Mixed Media",
        medium: "Print",
        description: "The artwork explores themes of memory, cultural identity, and the personal significance..."
    },
    {
        id: "92b0fc81-e16f-4a18-a5c6-4a3ab2396193",
        name: "Sue",
        price: 0,
        image: "/images/artwork/AW3_flower_mainpage.png",
        inStock: 2,
        fastDelivery: true,
        ratings: 4,
        category: "Sculpture",
        medium: "Clay",
        description: "Inspired by Judy Chicago, I aim to celebrate the female sexual organ through vulva imagery..."
    },
    {
        id: "ddc599ae-e14e-4d76-ae8e-87cfd93b5c2f",
        name: "Eye of The Storm",
        price: 0,
        image: "/images/placeholder.jpg", // Placeholder since no image in CSV
        inStock: 1,
        fastDelivery: false,
        ratings: 4,
        category: "Sculpture",
        medium: "Paper",
        description: "My composition centers on the metaphor of the 'eye of the storm'..."
    },
    {
        id: "e217d38c-5ce1-4043-ac8c-90b02f79a4e9",
        name: "Anicca",
        price: 0,
        image: "/images/placeholder.jpg", // Placeholder since no image in CSV
        inStock: 0,
        fastDelivery: false,
        ratings: 3,
        category: "Sculpture",
        medium: "Paper",
        description: "Suspended burned papers form an upward spiral in this installation..."
    },
    {
        id: "fa2fa60a-9eb5-4b28-9c3e-6bee6a344676",
        name: "Migratory Circle",
        price: 0,
        image: "/images/artwork/AW4_Dog_mainpage.png",
        inStock: 5,
        fastDelivery: true,
        ratings: 5,
        category: "Painting",
        medium: "Oil Paint",
        description: "This piece reflects the dynamics within my family and the changes I've experienced..."
    }
];

const Context = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
        byCategory: "", // Added category filter
        byMedium: "",   // Added medium filter
    });

    console.log(productState);

    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    );
};

export const CartState = () => {
    return useContext(Cart);
};

export default Context;