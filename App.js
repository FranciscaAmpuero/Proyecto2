// clase para entrada productos
class Product {
    constructor(name,price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
     }
}

//clase de la inferfaz de usuario
class UI {

    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
               <strong>Nombre producto</strong>: ${product.name}
               <strong>Precio</strong>: ${product.price}
               <strong>Año</strong>: ${product.year}
               <a href="#" class="btn btn-danger" name="delete">eliminar</a>
            </div>
       </div>
        `;
        //insertar elemento hijo
        productList.appendChild(element);

    }
        //resetar
    resetForm(){
        document.getElementById('product-form').reset();
    }

        // eliminar producto con una condicional desde la interfaz
    deleteProduct(element){
        if(element.name === 'delete') {
         element.parentElement.parentElement.parentElement.remove();
         this.showMessage('producto eliminado satisfactoriamente!', 'danger')
        }

    }
//alertas con bootstrap segun la acción 
    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = ` alert alert-${cssClass} mt-4` ;
        div.appendChild(document.createTextNode(message));
            //Alerta DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function (){ //timer para eliminar alerta
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//Eventos DOM
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
   const name =  document.getElementById('name').value;
   const price = document.getElementById('price').value;
   const year =  document.getElementById('year').value;
   //guardar constructor
   const product = new Product(name, price,year);
   

   const ui = new UI();

   if (name === "" || price === "" || year === "") {
    return ui.showMessage("Por favor inserte algún dato", "danger");
  }

   ui.addProduct(product);
   //  resetear y mensaje de guardado
   ui.resetForm();
   ui.showMessage('Producto agregado con éxito!', 'success');

   e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(e) {
 const ui = new UI();
 ui.deleteProduct(e.target);
});