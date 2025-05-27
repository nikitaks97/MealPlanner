import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [mealInput, setMealInput] = useState('');
  const [mealRecipeId, setMealRecipeId] = useState('');
  const [recipeInput, setRecipeInput] = useState('');
  const [shoppingInput, setShoppingInput] = useState('');
  const [shoppingRecipeId, setShoppingRecipeId] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meals').then(res => res.json()).then(setMeals);
    fetch('/api/recipes').then(res => res.json()).then(setRecipes);
    fetch('/api/shopping-list').then(res => res.json()).then(setShoppingList);
  }, []);

  // Fetch shopping list for selected recipe
  useEffect(() => {
    if (selectedRecipe) {
      fetch(`/api/shopping-list?recipeId=${selectedRecipe.id}`)
        .then(res => res.json())
        .then(setShoppingList);
    } else {
      fetch('/api/shopping-list').then(res => res.json()).then(setShoppingList);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const addMeal = e => {
    e.preventDefault();
    fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: mealInput, recipeId: mealRecipeId })
    })
      .then(res => res.json())
      .then(newMeal => {
        setMeals([...meals, newMeal]);
        handleAdd(e.target);
      });
    setMealInput('');
    setMealRecipeId('');
  };

  const addRecipe = e => {
    e.preventDefault();
    fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: recipeInput })
    })
      .then(res => res.json())
      .then(newRecipe => setRecipes([...recipes, newRecipe]));
    setRecipeInput('');
  };

  const addShoppingItem = e => {
    e.preventDefault();
    fetch('/api/shopping-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: shoppingInput, recipeId: shoppingRecipeId || (selectedRecipe && selectedRecipe.id) })
    })
      .then(res => res.json())
      .then(newItem => setShoppingList([...shoppingList, newItem]));
    setShoppingInput('');
    setShoppingRecipeId('');
  };

  const deleteMeal = id => {
    fetch(`/api/meals/${id}`, { method: 'DELETE' })
      .then(() => setMeals(meals.filter(meal => meal.id !== id)));
  };

  const deleteRecipe = id => {
    fetch(`/api/recipes/${id}`, { method: 'DELETE' })
      .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)));
  };

  const deleteShoppingItem = id => {
    fetch(`/api/shopping-list/${id}`, { method: 'DELETE' })
      .then(() => setShoppingList(shoppingList.filter(item => item.id !== id)));
  };

  const handleDelete = async (id, type, deleteFunction) => {
    const element = document.getElementById(id);
    element.classList.add('deleting');
    await new Promise(resolve => setTimeout(resolve, 300));
    deleteFunction(id);
  };

  const handleAdd = (element) => {
    element.classList.add('success');
    setTimeout(() => element.classList.remove('success'), 400);
  };

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '2rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Meal Planner Pro
        </h1>
        
        <div className="grid">
          {/* Meals Section */}
          <section className={`card ${loading ? 'loading' : ''}`}>
            <h2>Meals</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              addMeal(e);
              handleAdd(e.target);
            }}>
              <input
                type="text"
                value={mealInput}
                onChange={e => setMealInput(e.target.value)}
                placeholder="Add meal"
              />
              <select
                value={mealRecipeId}
                onChange={e => setMealRecipeId(e.target.value)}
              >
                <option value="">Select a recipe</option>
                {recipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                ))}
              </select>
              <button type="submit">Add Meal</button>
            </form>
            <ul>
              {meals.length === 0 && !loading ? (
                <div className="empty-state">Add your first meal</div>
              ) : (
                meals.map(meal => (
                  <li 
                    key={meal.id} 
                    id={meal.id}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <span>{meal.name}</span>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(meal.id, 'meal', deleteMeal);
                    }}>Delete</button>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Recipes Section */}
          <section className="card">
            <h2>Recipes</h2>
            <form onSubmit={addRecipe}>
              <input
                type="text"
                value={recipeInput}
                onChange={e => setRecipeInput(e.target.value)}
                placeholder="Add recipe"
              />
              <button type="submit">Add Recipe</button>
            </form>
            <ul>
              {recipes.map(recipe => (
                <li key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                  <span>{recipe.name}</span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    deleteRecipe(recipe.id);
                  }}>Delete</button>
                </li>
              ))}
            </ul>
          </section>

          {/* Shopping List Section */}
          <section className="card">
            <h2>Shopping List</h2>
            <form onSubmit={addShoppingItem}>
              <input
                type="text"
                value={shoppingInput}
                onChange={e => setShoppingInput(e.target.value)}
                placeholder="Add item"
              />
              <select
                value={shoppingRecipeId}
                onChange={e => setShoppingRecipeId(e.target.value)}
              >
                <option value="">Select a recipe</option>
                {recipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                ))}
              </select>
              <button type="submit">Add Item</button>
            </form>
            <ul>
              {shoppingList.map(item => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <button onClick={() => deleteShoppingItem(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="theme-toggle">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
