# online_store

![Screenshot 2024-07-12 at 3 15 45 PM](https://github.com/user-attachments/assets/8bd09972-d3ca-4af6-84fe-67011194dbc6)

![719EC84C-16E7-4E44-8EA2-9E459453122C](https://github.com/user-attachments/assets/916b35a8-c0a2-4ec8-bf4c-2b57202f28ee)

## Rental Car Data Structure
- id: car_id 
- make: Toyota, Honda, Huyndai, Ferrari, Audi, Porche
- year: 1990 - 2024
- body_style: Sedan, SUV, Crossover, Coupe, Hatchback, Minivan
- horsepower: 100-500
- engine: V4, V6, V8
- rental_price: 50 - 1000
- color: Mockaroo's color selection
- curb_weight: 2000 - 6000

### Learning model: defining user_profile
- User_Type:
-- Enthusiast = (make: Ferrari, Audi, Porche) & (horsepower => 250) & (rental_price > 500)
-- Utility = (make: Toyota, Honda, Huyndai) & (horsepower < 250) & (rental_price <= 500)
-- Robust = otherwise

## User Profile Data Structure
