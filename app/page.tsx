import Image from 'next/image'
import { fetchFoods } from './actions'

export default async function Home() {
  let foods

  try {
    foods = await fetchFoods()
  } catch (error) {
    console.error('Failed to fetch foods:', error)
    return (
      <div>
        Error loading foods. Please{' '}
        <a style={{ color: 'blue' }} href="/login">
          sign-in
        </a>
      </div>
    )
  }

  if (!foods || foods.length === 0) {
    return <div>No foods available.</div>
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
