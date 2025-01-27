import { IFood } from '@/types'
import Image from 'next/image'

type TFoodCardProps = {
  food: IFood
}

const FoodCard: React.FC<TFoodCardProps> = ({ food }) => {
  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Set to false for 24-hour time
      timeZone: 'JST'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="food-card">
      {food.image && (
        <div className="image-container">
          <Image
            src={food.image}
            alt={food.food_name || 'Food Image'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="70px"
          />
        </div>
      )}
      <div className="food-details">
        <h2>
          {(food.food_name && food.food_name?.charAt(0).toUpperCase() + food.food_name?.slice(1)) ||
            'Unknown Food'}
        </h2>
        <p className="restaurant">
          {(food.restaurant &&
            food.restaurant?.charAt(0).toUpperCase() + food.restaurant?.slice(1)) ||
            'Unknown Restaurant'}
        </p>
        <p>
          <strong>Calories:</strong> {food.calories || '0kcal'}
        </p>
        <p>
          <strong>Protein:</strong> {food.protein || '0g'}
        </p>
        <p>
          <strong>Rating:</strong> {food.rating || 0}
        </p>
        <p className="date">{formattedDate(food.created_at)}</p>
        {food.opinion && <p className="opinion">{food.opinion}</p>}
      </div>
    </div>
  )
}

export default FoodCard
