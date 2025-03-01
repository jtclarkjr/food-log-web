import { deleteFood, fetchFoodById, updateFood } from '../actions'
import { IFood } from '@/types'

import Button from '../_components/button'
import Image from 'next/image'
import { use, Suspense } from 'react'
import { after } from 'next/server'
import { track } from '@vercel/analytics/server'

const FoodIdContent = ({ id }: { id: string }) => {
  const food: IFood | null = use(fetchFoodById(id))

  if (!food) {
    return <p>Food not found</p>
  }

  after(() => {
    track('Updated', {
      id: food.id || ''
    })
  })

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <form style={{ marginTop: '1rem' }} action={deleteFood}>
        <input type="hidden" name="id" value={food.id} />
        <input type="hidden" name="image" value={food.image || ''} />
        <Button variant="delete" />
      </form>

      <h1>Update Food</h1>
      <form style={{ marginTop: '1rem' }} action={updateFood}>
        <input type="hidden" name="id" value={food.id} />
        <div>
          <label htmlFor="food_name">Food Name:</label>
          <input
            type="text"
            id="food_name"
            name="food_name"
            defaultValue={food.food_name}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="restaurant">Restaurant:</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            defaultValue={food.restaurant}
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={food.rating}
            min="0"
            max="10"
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            defaultValue={food.calories}
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="protein">Protein:</label>
          <input
            type="number"
            id="protein"
            name="protein"
            defaultValue={food.protein}
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="opinion">Opinion:</label>
          <textarea
            id="opinion"
            name="opinion"
            defaultValue={food.opinion}
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
          <div>
            {food.image && (
              <>
                <input
                  type="hidden"
                  id="currentImage"
                  name="currentImage"
                  defaultValue={food.image}
                />
                <p>Current image:</p>
                <Image
                  priority
                  src={food.image}
                  alt={food.image}
                  width={250}
                  height={0}
                  layout="intrinsic"
                />
              </>
            )}
          </div>
        </div>
        <Button variant="save" />
      </form>
    </div>
  )
}

const FoodFormSkeleton = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h1>Update Food</h1>
      <br />
      <div
        className="skeleton skeleton-header"
        style={{ height: '30px', width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-input"
        style={{ height: '50px', width: '100%', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-input"
        style={{ height: '50px', width: '100%', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-input"
        style={{ height: '50px', width: '100%', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-input"
        style={{ height: '50px', width: '100%', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-input"
        style={{ height: '50px', width: '100%', marginBottom: '1rem' }}
      />
      <div
        className="skeleton skeleton-button"
        style={{ height: '40px', width: '100%', marginBottom: '1rem' }}
      />
    </div>
  )
}

export default function FoodIdPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { id } = params

  return (
    <Suspense fallback={<FoodFormSkeleton />}>
      <FoodIdContent id={id} />
    </Suspense>
  )
}
