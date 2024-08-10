import { React, useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useSwipeable } from 'react-swipeable';
import NavBar from '../components/NavBar';
import '../style/RecruitingStyle.css'; // Create and import your CSS file for styling

function Recruiting() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');

  async function getData() {
    const response = await fetch('http://localhost:5000/output');
    const res = await response.json();
    console.log(res);
    setCards(res);
  }
  useEffect(() => {
    getData();
  }, []);

  function handleSwipe(direction) {
    setSwipeDirection(direction);
    setTimeout(() => {
      console.log(direction === 'right' ? 'Liked' : 'Disliked', cards.filter((card) => card.sn === currentIndex).name);
      setSwipeDirection('');
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentIndex(nextIndex);
    }, 500); // Duration should match the CSS transition time
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="recruiting-container">
      (
      <div
        role="button"
        aria-label="Swipeable card"
        tabIndex={0}
        onMouseDown={swipeHandlers.onMouseDown}
        onMouseUp={swipeHandlers.onMouseUp}
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') handleSwipe('left');
          if (e.key === 'ArrowRight') handleSwipe('right');
        }}
      >
        <Card
          className={`card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}
          cover={(
            <div className="image-container">
              <img alt={cards.filter((card) => card.sn === currentIndex).name} src={cards.filter((card) => card.sn === currentIndex).image} />
              <div className="text-overlay">
                <div className="text-content">
                  <div className="card-meta-title">{cards.filter((card) => card.sn === currentIndex).map((card) => card.name)} </div>
                  <div className="card-meta-subtitle">Major: {cards.filter((card) => card.sn === currentIndex).map((card) => card.major)}</div>
                  <div className="card-meta-subtitle">Minor: {cards.filter((card) => card.sn === currentIndex).map((card) => card.minor)}</div>
                  <div className="card-meta-subtitle">Skills: {cards.filter((card) => card.sn === currentIndex).map((card) => card.skills).join(', ')}</div>
                  <div className="card-meta-subtitle">Interests: {cards.filter((card) => card.sn === currentIndex).map((card) => card.interests).join(', ')}</div>
                  <div className="card-meta-subtitle">Tindar Index: {cards.filter((card) => card.sn === currentIndex).map((card) => card.tindarIndex)} </div>
                </div>
              </div>
            </div>
          )}
          style={{ width: 300, margin: '0 auto', textAlign: 'center' }}
        />
      </div>
      )
      <div className="buttons-container">
        <Button onClick={() => handleSwipe('left')}>No</Button>
        <Button onClick={() => handleSwipe('right')}>Yes</Button>
      </div>
      <NavBar />
    </div>
  );
}

export default Recruiting;
