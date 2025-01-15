import Image from 'next/image'
import { fetchFoods } from './actions'
import { Food } from './types'

export default async function Home() {
  const foods: Food[] | null = await fetchFoods()
  if (!foods || foods.length === 0) {
    return (
      <div>
        <h1>Food log</h1>
        <p>No foods added yet</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Food log</h1>
      <ul>
        {foods?.map((food) => (
          <li key={food.id}>
            <h2>{food.food_name}</h2>
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
          </li>
        ))}
      </ul>
    </div>
  )
}
