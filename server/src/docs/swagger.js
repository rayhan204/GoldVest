import swaggerJsdoc from "swagger-jsdoc";
import {
  userSchema,
  walletSchema,
  portofolioSchema,
  transactionSchema,
  goldPriceSchema
} from "./schemas.js";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "GoldVest API",
      version: "1.0.0",
      description:
        "REST API untuk aplikasi simulasi investasi emas GoldVest.",
    },

    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000/api",
        description: "GoldVest API",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    schemas:{
        User:userSchema,
        Wallet:walletSchema,
        Portofolio:portofolioSchema,
        Transaction:transactionSchema,
        GoldPrice:goldPriceSchema
     }
    },
    

    security: [
      {
        bearerAuth: [],
      },
    ],
    tags:[

    {
        name:"Authentication",
        description:"Authentication API"
    },
    {
        name:"Users"
    },
    {
        name:"Wallet"
    },
    {
        name:"Portofolio"
    },
    {
        name:"Transactions"
    },
    {
        name:"Dashboard"
    },
    {
        name:"Gold Price"
    }
    ]
  },

  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;