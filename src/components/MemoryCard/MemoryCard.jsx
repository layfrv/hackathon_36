import './MemoryCard.css';

function MemoryCard(props) {
  const {imageUrl, name, onClick, id, isFlipped} = props;
  
  return (
    <div className={isFlipped ? 'memory-card memory-card__open' : 'memory-card'} onClick={() => onClick(id)}>
      <div className='memory-card__front' >
      </div>
      <div className='memory-card__back'>
        <img src={imageUrl} alt={name} className='memory-card__image'/>
      </div>
    </div>
  );
}
export default MemoryCard;
