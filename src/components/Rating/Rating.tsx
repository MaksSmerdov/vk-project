import styles from './Rating.module.scss';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
  value: number;
}

const Rating = ({ value }: RatingProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return styles['rating--yellow'];
    if (rating >= 7) return styles['rating--green'];
    if (rating >= 5) return styles['rating--gray'];
    return styles['rating--red'];
  };

  return (
    <div className={`${styles['rating']} ${getRatingColor(value)}`}>
      {value.toFixed(1)}
      <FaStar className={styles['rating__star']} />
    </div>
  );
};

export default Rating;
