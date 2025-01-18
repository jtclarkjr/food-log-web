import { deleteFood, fetchFoodById, updateFood } from '../actions'
import { IFood } from '@/types'

import SubmitButton from '../_components/submitButton'
import Image from 'next/image'
import { use } from 'react'

export default function FoodIdPage({ params }: { params: { id: string } }) {
  const { id } = params
  const food: IFood | null = use(fetchFoodById(id))

  if (!food) {
    return <p>Food not found</p>
  }

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <form style={{ marginTop: '1rem' }} action={deleteFood}>
        <input type="hidden" name="id" value={food.id} />
        <button type="submit" className="delete-button">
          Delete
        </button>
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
            // defaultValue={food.image}
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
                <Image src={food.image} alt={food.image} height={200} width={200} />
              </>
            )}
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
