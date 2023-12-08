import likeElement from '../../assets/icons/like-icon.svg';
import './MemoryCard.css';

function MemoryCard(props) {
  const {imageUrl, name, onClick, id, isFlipped, isAnimate} = props;
  
  return (
    <div className={isFlipped ? 'memory-card memory-card__open' : 'memory-card'} onClick={() => onClick(id)}>
      <div className='memory-card__front' >
      </div>
      <div className='memory-card__back'>
        <img src={imageUrl} alt={name} className='memory-card__image'/>
        {isAnimate && <img className='like-element' src={likeElement} alt='like'/> }
      </div>
    </div>
  );
}
export default MemoryCard;
