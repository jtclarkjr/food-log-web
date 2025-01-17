import Image from 'next/image'
import Link from 'next/link'
import { fetchFoods } from './actions'
import { IFood } from '@/types'

export default async function FoodLog() {
  const foods: IFood[] | null = await fetchFoods()

  return (
    <div className="food-log">
      <Link href="/auth">
        <div className="signout-button">Signout</div>
      </Link>

      <main className="container">
        <h1>Food Log</h1>
        {!foods || foods.length === 0 ? (
          <p>No foods added yet</p>
        ) : (
          <ul className="food-list">
            {foods.map((food) => (
              <li className="food-card" key={food.id}>
                <Link href={`/food/${food.id}`}>
                  <h2>{food.food_name}</h2>
                  <p>
                    <i>{new Date(food.created_at).toLocaleDateString()}</i>
                  </p>
                  <p>Restaurant: {food.restaurant}</p>
                  <p>Rating: {food.rating}</p>
                  <p>Calories: {food.calories}</p>
                  <p>Protein: {food.protein}</p>
                  <p>Opinion: {food.opinion}</p>
                  {food.image && (
                    <Image
                      priority
                      src={food.image}
                      alt={food.food_name || 'food'}
                      height={200}
                      width={200}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Floating Action Button */}
      <Link href="/food/create">
        <div className="fab">+</div>
      </Link>
    </div>
  )
}
