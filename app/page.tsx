import Image from 'next/image'
import Link from 'next/link'
import { fetchFoods } from './actions'
import { IFood } from './types'

export default async function Home() {
  const foods: IFood[] | null = await fetchFoods()

  return (
    <div>
      <Link
        href={'/login'}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Signout
      </Link>

      <main>
        <h1>Food log</h1>
        {!foods || foods.length === 0 ? (
          <p>No foods added yet</p>
        ) : (
          <ul>
            {foods.map((food) => (
              <li key={food.id}>
                <h2>{food.food_name}</h2>
                <p>
                  <i>{food.updated_at}</i>
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
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
