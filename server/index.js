const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data for demo
let meals = [];
let recipes = [];
let shoppingLists = [];
let nextRecipeId = 1;
let nextMealId = 1;
let nextShoppingListId = 1;

// Meals endpoints
app.get('/api/meals', (req, res) => res.json(meals));
app.post('/api/meals', (req, res) => {
  // Expect: { name, recipeId }
  const { name, recipeId } = req.body;
  const meal = { id: nextMealId++, name, recipeId };
  meals.push(meal);
  res.status(201).json(meal);
});

// Recipes endpoints
app.get('/api/recipes', (req, res) => res.json(recipes));
app.post('/api/recipes', (req, res) => {
  // Expect: { name }
  const { name } = req.body;
  const recipe = { id: nextRecipeId++, name };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// Shopping list endpoints
app.get('/api/shopping-list', (req, res) => {
  // Optionally filter by recipeId: /api/shopping-list?recipeId=1
  const { recipeId } = req.query;
  if (recipeId) {
    return res.json(shoppingLists.filter(item => item.recipeId == recipeId));
  }
  res.json(shoppingLists);
});
app.post('/api/shopping-list', (req, res) => {
  // Expect: { name, recipeId }
  const { name, recipeId } = req.body;
  const item = { id: nextShoppingListId++, name, recipeId };
  shoppingLists.push(item);
  res.status(201).json(item);
});

// Delete endpoints
app.delete('/api/meals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  meals = meals.filter(meal => meal.id !== id);
  res.status(204).send();
});

app.delete('/api/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  recipes = recipes.filter(recipe => recipe.id !== id);
  res.status(204).send();
});

app.delete('/api/shopping-list/:id', (req, res) => {
  const id = parseInt(req.params.id);
  shoppingLists = shoppingLists.filter(item => item.id !== id);
  res.status(204).send();
});

// Health check endpoint for Docker
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Meal Planner API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      meals: '/api/meals',
      recipes: '/api/recipes',
      shoppingList: '/api/shopping-list'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
