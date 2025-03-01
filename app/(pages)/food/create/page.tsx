import { createClient } from '@/utils/supabase/server'
import { createFood } from '../actions'
import { unauthorized } from 'next/navigation'
import Button from '../_components/button'

export default async function CreateFoodPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (!data.user || error) {
    unauthorized()
  }

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h1>Create New Food</h1>
      <form style={{ marginTop: '1rem' }} action={createFood}>
        <div>
          <label htmlFor="food_name">Food Name:</label>
          <input
            type="text"
            id="food_name"
            name="food_name"
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
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="text"
            id="calories"
            name="calories"
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="protein">Protein:</label>
          <input
            type="text"
            id="protein"
            name="protein"
            style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="opinion">Opinion:</label>
          <textarea
            id="opinion"
            name="opinion"
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
        </div>
        <Button variant="save" />
      </form>
    </div>
  )
}
