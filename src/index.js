import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager();

//Bienvenida
app.get("/", (req, res) => {
    res.json({
        message1: "Bienvenido",
        message2: "Para ver todos nuestros productos dirigase a localhost:8080/products",
        message3: "Para ver nuestros 5 primeros productos dirigase a localhost:8080/products/?limit=5",
        message4: "Para ver todos nuestros productos según el ID, vaya a localhost:8080/products/:pid o número de ID."
    });
});

//Obtener productos
app.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = productManager.getProducts();

        // Filtrar productos por limite
        const limitedProducts = limit ? products.slice(0, limit) : products; 

        // Enviar respuesta con los productos filtrados
        res.json(limitedProducts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos, verifique los datos" });
    }
});

// Obtener producto por ID
app.get("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);

        if (product) {
            // Enviar respuesta con el producto encontrado
            res.json(product);
        } else {
            // Respuesta de error si no se encuentra el producto
            res.status(404).json({ error: "Producto no encontrado, verifique los datos" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto, verifique los datos" });
    }
});

app.listen(8080, () => console.log("Servidor conectado con exito"));