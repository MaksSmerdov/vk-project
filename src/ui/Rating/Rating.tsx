import styles from './Rating.module.scss';
import { FaStar } from 'react-icons/fa';
import { CSSProperties } from 'react';

interface RatingProps {
  value: number;
  style?: CSSProperties;
}

const Rating = ({ value, style }: RatingProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return styles['rating--yellow'];
    if (rating >= 7) return styles['rating--green'];
    if (rating >= 5) return styles['rating--gray'];
    return styles['rating--red'];
  };

  return (
    <div className={`${styles['rating']} ${getRatingColor(value)}`} style={style}>
      <FaStar className={styles['rating__star']} />
      {value.toFixed(1)}
    </div>
  );
};

export default Rating;
