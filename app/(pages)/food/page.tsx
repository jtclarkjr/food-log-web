import Image from 'next/image'
import Link from 'next/link'
import { fetchFoods } from './actions'
import { IFood } from '@/types'
import { use, Suspense } from 'react'

const FoodLogContent = () => {
  const foods: IFood[] | null = use(fetchFoods())

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
              <li className="food-card" key={food.id}>
                <Link href={`/food/${food.id}`}>
                  <h2>{food.food_name}</h2>
                  <p>
                    <i>{new Date(food.created_at).toLocaleDateString()}</i>
                  </p>
                  <p>restaurant: {food.restaurant}</p>
                  <p>rating: {food.rating}</p>
                  <p>calories: {food.calories}</p>
                  <p>protein: {food.protein}</p>
                  <p>opinion: {food.opinion}</p>
                  {food.image && (
                    <div>
                      <Image
                        priority
                        src={food.image}
                        alt={food.food_name || 'food'}
                        height={200}
                        width={200}
                      />
                    </div>
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

const FoodLogSkeleton = () => {
  const placeholderItems = Array.from({ length: 3 }) // Placeholder for 3 loading items

  return (
    <div className="food-log" style={{ marginTop: '1rem' }}>
      <main className="container">
        <div className="skeleton-home skeleton-home-header" />
        <ul className="food-list">
          {placeholderItems.map((_, index) => (
            <li className="food-card skeleton-home-item" key={index}>
              <div className="skeleton-home skeleton-home-title" />
              <div className="skeleton-home skeleton-home-text" />
              <div className="skeleton-home skeleton-home-text" />
              <div className="skeleton-home skeleton-home-image" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default function FoodLog() {
  return (
    <Suspense fallback={<FoodLogSkeleton />}>
      <FoodLogContent />
    </Suspense>
  )
}
