// Levantar el server con nodemon en el index, para asi poder usar la API !

require('./db/mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const Producto = require('./model/productos');

app.use(express.json());

// Read-- Mostrar todos los productos
app.get('/productos', (req, res) => {
    Producto.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.status(404).send(err));
})

app.get('/producto/:id', (req, res) => {
  const _id = req.params.id;
  Producto.findById(_id)
   .then((producto) => {
    if(!producto) {
        return res.status(404).send("Producto no encontrado");
    }
        
    res.status(200).send(producto)
    })
   .catch(err => res.status(404).send(err))
  
});

app.get('/botas', (req, res) => {
    const query = { category: 'botas'};
    Producto.findById(query)
     .then((producto) => {
      if(!producto) {
          return res.status(404).send("Producto no encontrado");
      }
          
      res.status(200).send(producto)
      })
     .catch(err => res.status(404).send(err))
    
  });

  app.get('/zapatos', (req, res) => {
      const category = req.params.category
      Producto.find({ category: "zapatos"})
      .then((producto) => {
      if(!producto) {
          return res.status(404).send("Producto no encontrado");
      }
          
      res.status(200).send(producto)
      })
     .catch(err => res.status(404).send(err))
    
  });

// Create -- Agregar Productos a la DB
app.post('/producto', (req, res) => {
    const producto = new Producto(req.body)
    producto.save()
        .then(() => {
            res.status(201).send(producto);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.patch('/patch/:id', (req, res) => {
    const _id = req.params.id;
    Producto.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true
    }).then((producto) => {
        if(!producto) {
            return res.status(404).send();
        }
        res.send(producto);
    }).catch(err => {
        res.status(404).send(err);
    });
});

app.delete('/delete/:id', (req, res) => {
    const _id = req.params.id;
    Producto.findByIdAndDelete(_id, req.body, {
        new: true,
        runValidators: true
    }).then((producto) => {
        if(!producto) {
            return res.status(404).send();
        }
        res.send(producto);
    }).catch(err => {
        res.status(404).send(err);
    });
});
// Update
// app.update()

// Delete
// app.delete()

app.listen(port, () => {
    console.log(`Funcionando en http://localhost:${port}`);
});
