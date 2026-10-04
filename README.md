# Nutri-Plate

NutriPlate is a web application that helps users discover recipe ideas, track calorie intake, and view the ingredients needed to prepare meals. The goal is to make healthy eating easier by providing nutritional information alongside delicious recipes.

## Features

- Search and discover meal recipes
- View ingredients required for each recipe
- Track calories per meal
- Calculate total daily calorie intake
- User-friendly and responsive interface
- Healthy meal recommendations

## Technologies Used

- HTML
- CSS
- JavaScript
- API Integration (for recipes and nutrition data)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/itssasha22/Meal-Mind.git
```

2. Navigate to the project folder:

```bash
cd Meal-Mind
```

3. Install dependencies:

```bash
npm install
```

4. Create a local environment file based on the example:

```bash
cp .env.example .env
```

5. Start the development server:

```bash
npm run dev
```

## Environment Variables

This app fetches recipes from the Tasty API through RapidAPI. Copy `.env.example` to `.env` and keep your key private.

- `VITE_RAPIDAPI_KEY`
- `VITE_RAPIDAPI_HOST` defaults to `tasty.p.rapidapi.com`

## Usage

1. Open the app in your browser at the URL shown by `npm run dev`.
2. Use the Search page to query recipes by ingredient, name, or category.
3. Browse search results, favorite recipes, and view details.
4. Track meals using the Calorie Tracker.

## Screenshots

Add screenshots of your application here.

## Future Improvements

- User authentication
- Personalized meal plans
- Weekly calorie reports
- Save favorite recipes
- Dietary filters (vegan, keto, gluten-free)

## Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Author

**Sasha Lisa**

GitHub: https://github.com/itssasha22
