const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Ruta principal para obtener datos de la API y mostrar en tarjetas
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
    const cocktails = response.data.drinks || [];


// Configuración de las vistas (debe ir antes de las rutas que utilizan render)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


    res.render('index', { cocktails });
  } catch (error) {
    console.error('Error al obtener datos de la API:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Ruta para mostrar el detalle de un elemento
app.get('/cocktail/:id', async (req, res) => {
  try {
    const cocktailId = req.params.id;
    const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
    const cocktail = response.data.drinks ? response.data.drinks[0] : null;

    
    res.render('detail', { cocktail });
  } catch (error) {
    console.error('Error al obtener detalles del cóctel:', error.message);
    res.status(500).json({ error: 'Error al obtener detalles del cóctel' });
  }
});

// Configuración del motor de plantillas (puedes usar el que prefieras, por ejemplo, EJS)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Ruta que utiliza render
app.get('/', (req, res) => {
    res.render('index.ejs');  // Asegúrate de que 'index' sea el nombre correcto de tu vista
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



