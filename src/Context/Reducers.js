export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            // Check if item already exists in cart
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If exists, increase quantity
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                };
            }
            // If new item, add to cart with quantity 1
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
            };

        case "CHANGE_CART_QTY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, qty: action.payload.qty }
                        : item
                ),
            };

        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            };

        default:
            return state;
    }
};

export const productReducer = (state, action) => {
    switch (action.type) {
        case "SORT_BY_PRICE":
            return { ...state, sort: action.payload };

        case "FILTER_BY_STOCK":
            return { ...state, byStock: !state.byStock };

        case "FILTER_BY_DELIVERY":
            return { ...state, byFastDelivery: !state.byFastDelivery };

        case "FILTER_BY_RATING":
            return { ...state, byRating: action.payload };

        case "FILTER_BY_SEARCH":
            return { ...state, searchQuery: action.payload };

        case "FILTER_BY_CATEGORY":
            return { ...state, byCategory: action.payload };

        case "FILTER_BY_MEDIUM":
            return { ...state, byMedium: action.payload };

        case "CLEAR_FILTERS":
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
                byCategory: "",
                byMedium: ""
            };

        default:
            return state;
    }
};