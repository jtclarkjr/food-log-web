import { createClient } from '@/utils/supabase/server'
import { deleteFood, fetchFoodById, updateFood } from '../actions'
import { IFood } from '@/types'
import { unauthorized } from 'next/navigation'
import SubmitButton from '../_components/submitButton'

type Params = Promise<{ id: string }>

export default async function FoodIdPage({ params }: { params: Params }) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (!data.user || error) {
    unauthorized()
  }
  const { id } = await params
  const food: IFood | null = await fetchFoodById(id)

  if (!food) {
    return <p>Food not found</p>
  }

  return (
    <div style={{ maxWidth: '400px', margin: '8rem auto' }}>
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
            defaultValue={food.image!}
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
