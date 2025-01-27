import Link from 'next/link'

import { fetchFoods } from './actions'
import { use } from 'react'
import FoodCard from './_components/foodCard'

const FoodLogContent = () => {
  const foods = use(fetchFoods())

  return (
    <div className="food-log">
      <Link href="/auth/signout">
        <div className="signout-button">Signout</div>
      </Link>

      <main className="container">
        <h1>Food Log</h1>
        {!foods || foods.length === 0 ? (
          <p>No foods added yet</p>
        ) : (
          <ul className="food-list">
            {foods.map((food) => (
              <li key={food.id}>
                <Link href={`/food/${food.id}`}>
                  <FoodCard food={food} />
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

export default FoodLogContent
