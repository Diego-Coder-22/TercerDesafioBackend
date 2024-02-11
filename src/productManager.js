import fs from "fs";

class ProductManager {

    constructor(filepath = '../products.json') {
        this.path = filepath;
        this.currentId = 1;

        if (fs.existsSync(filepath)) {
            const fileContent = fs.readFileSync(filepath, 'utf-8');
            this.products = JSON.parse(fileContent);

            if (this.products.length > 0) {
                this.currentId = Math.max(...this.products.map(p => p.id)) + 1;
            }
        } else {
            this.products = [];
            fs.writeFileSync(filepath, '[]', 'utf-8');
        }
    }

    saveToFile() {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }



  addProduct(title,description,price,thumbnail,code,stock) {
    const newProductId = this.currentId++;

    if(this.products.some(product => product.code === code)) {
        throw new Error("El código ya existe. Debe ser único.");
    }

    const newProduct = {
        id: this.currentId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    this.products.push(newProduct);
    this.saveToFile();

    return newProduct;
  }

  getProducts() {
    const fileContent = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(fileContent);
}

getProductById(productId) {
  const allProducts = this.getProducts();
  return allProducts.find(product => product.id === productId);
}

updateProduct(productId, change) {
    const productIndex = this.products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...change,
                id: productId,
            };
            this.saveToFile();
            return true;
        }

        return false;
    }


    deleteProduct(productId) {
      const initialLength = this.products.length;
      this.products = this.products.filter(product => product.id !== productId);

      if (this.products.length !== initialLength) {
          this.saveToFile();
          return true;
      }

      return false;
  }
}

const change = {
  thumbnail: "new_imagen_kimono_junior_azul",
  price: "59,99",
};

const productManager = new ProductManager('../products.json');
try {
productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz The One Junior Azul", "69,99", "imagen_kimono_the_one_junior_azul","8542399","25");
productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz The One Junior Blanco", "79,99", "imagen_kimono_the_one_junior_blanco","8542398","15");
productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz The One Adulto Blanco", "89,99", "imagen_kimono_the_one_adulto_blanco","8542397","10");
productManager.addProduct("Kingz", "Kimono Jiu-Jitsu Brasileño Kingz The One Adulto Negro", "99,99", "imagen_kimono_the_one_adulto_negro","8542396","12");
productManager.addProduct("Vouk", "Vouk Africa Edición limitada 2.0 Adulto Blanco", "104,99", "imagen_vouk_adulto_africa_blanco","8542395","6");
productManager.addProduct("Vouk", "Vouk Africa Edición limitada 2.0 Adulto Negro", "104,99", "imagen_vouk_adulto_africa_negro","8542394","15");
productManager.addProduct("Vouk", "Vouk Tokio Edición limitada Adulto Azul Marino", "109,99", "imagen_vouk_adulto_tokio_azul_marino","8542393","16");
productManager.addProduct("Tatami", "Kimono Elements Superlite Adulto Negro", "49,99", "imagen_kimono_elements_superlite_adulto_negro","8542392","19");
productManager.addProduct("Tatami", "Kimono Elements Superlite Adulto Blanco", "49,99", "imagen_kimono_elements_superlite_adulto_blanco","8542391","16");
productManager.addProduct("Tatami", "Kimono Katakana Adulto Negro", "59,99", "imagen_kimono_katakana_adulto_negro","8542390","13");
productManager.addProduct("Tatami", "Kimono Katakana Adulto Blanco","59,99", "imagen_kimono_katakana_adulto_blanco","8542389","8");

/*productManager.deleteProduct();

if (success) {
        console.log('Producto eliminado con éxito');
    } else {
        console.log('No se encontró el producto con el ID especificado');
    }*/

  
  //productManager.deleteProduct();//Prueba eliminar productos inexistentes por ID
/*const update = productManager.updateProduct(4, change);
if (update) {
    console.log('Producto actualizado con éxito');
} else {
    console.log('No se encontró el producto con el ID especificado');
}*/
} catch (error) {
  console.error(error.message);
}

export default ProductManager;



