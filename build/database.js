"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = exports.Products = exports.Users = void 0;
exports.Users = [{
        id: "u001",
        email: "mauricioleite85@gmail.com",
        password: "mauricio123"
    },
    {
        id: "u002",
        email: "astrodev85@gmail.com",
        password: "astrodev123"
    }];
exports.Products = [{
        id: "p001",
        name: "Jaca",
        price: 10,
        category: "fruta"
    },
    {
        id: "p002",
        name: "Melancia",
        price: 30,
        category: "fruta"
    }];
exports.Purchase = [{
        userId: "u001",
        productId: "p002",
        quantity: 5,
        totalPrice: 150
    },
    {
        userId: "u002",
        productId: "p001",
        quantity: 2,
        totalPrice: 20
    }];
//# sourceMappingURL=database.js.map