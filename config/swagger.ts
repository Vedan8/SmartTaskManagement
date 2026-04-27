import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Task Management API",
      version: "1.0.0",
      description: "API documentation for Smart Task Management System",
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
    components: {
      securitySchemes: {
        tokenAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
        },
      },
    },
    security: [
      {
        tokenAuth: [],
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);