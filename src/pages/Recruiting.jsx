import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useSwipeable } from 'react-swipeable';
import NavBar from '../components/NavBar';
import '../style/RecruitingStyle.css'; // Create and import your CSS file for styling

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    major: 'Econ',
    minor: 'Math',
    skills: ['Data Analysis', 'Econometrics', 'Excel'],
    interests: ['Stock Market', 'Traveling', 'Basketball'],
    tindarIndex: 85,
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
    major: 'CS',
    minor: 'N/A',
    skills: ['JavaScript', 'React', 'Python'],
    interests: ['Gaming', 'Coding', 'Hiking'],
    tindarIndex: 90,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/150',
    major: 'Biology',
    minor: 'Chemistry',
    skills: ['Microscopy', 'Lab Work', 'Research'],
    interests: ['Reading', 'Nature', 'Yoga'],
    tindarIndex: 75,
  },
  {
    id: 4,
    name: 'Robert Brown',
    image: 'https://via.placeholder.com/150',
    major: 'Chem',
    minor: 'Physics',
    skills: ['Chemical Synthesis', 'Spectroscopy', 'Safety Protocols'],
    interests: ['Cooking', 'Sci-Fi Movies', 'Running'],
    tindarIndex: 65,
  },
  {
    id: 5,
    name: 'Emily Davis',
    image: 'https://via.placeholder.com/150',
    major: 'Gov',
    minor: 'History',
    skills: ['Public Speaking', 'Policy Analysis', 'Debate'],
    interests: ['Politics', 'Volunteering', 'Cycling'],
    tindarIndex: 80,
  },
  {
    id: 6,
    name: 'Michael Wilson',
    image: 'https://via.placeholder.com/150',
    major: 'Econ',
    minor: 'Finance',
    skills: ['Financial Modeling', 'Investment Analysis', 'Stata'],
    interests: ['Economics', 'Soccer', 'Chess'],
    tindarIndex: 88,
  },
  {
    id: 7,
    name: 'Sarah Miller',
    image: 'https://via.placeholder.com/150',
    major: 'Gov',
    minor: 'N/A',
    skills: ['Research', 'Writing', 'Public Policy'],
    interests: ['History', 'Travel', 'Music'],
    tindarIndex: 70,
  },
  {
    id: 8,
    name: 'David Anderson',
    image: 'https://via.placeholder.com/150',
    major: 'CS',
    minor: 'Math',
    skills: ['Algorithms', 'Machine Learning', 'Java'],
    interests: ['Coding', 'Puzzles', 'Basketball'],
    tindarIndex: 92,
  },
  {
    id: 9,
    name: 'Linda Martinez',
    image: 'https://via.placeholder.com/150',
    major: 'CS',
    minor: 'Psychology',
    skills: ['UI/UX Design', 'Web Development', 'JavaScript'],
    interests: ['Art', 'Design', 'Gaming'],
    tindarIndex: 85,
  },
  {
    id: 10,
    name: 'James Rodriguez',
    image: 'https://via.placeholder.com/150',
    major: 'English',
    minor: 'N/A',
    skills: ['Creative Writing', 'Editing', 'Public Speaking'],
    interests: ['Literature', 'Theater', 'Photography'],
    tindarIndex: 78,
  },
  {
    id: 11,
    name: 'Patricia Garcia',
    image: 'https://via.placeholder.com/150',
    major: 'Econ',
    minor: 'Philosophy',
    skills: ['Critical Thinking', 'Econometrics', 'Data Analysis'],
    interests: ['Philosophy', 'Running', 'Cooking'],
    tindarIndex: 82,
  },
  {
    id: 12,
    name: 'Christopher Martinez',
    image: 'https://via.placeholder.com/150',
    major: 'History',
    minor: 'N/A',
    skills: ['Historical Research', 'Archival Work', 'Writing'],
    interests: ['History', 'Travel', 'Museums'],
    tindarIndex: 67,
  },
  {
    id: 13,
    name: 'Barbara Thomas',
    image: 'https://via.placeholder.com/150',
    major: 'PPE',
    minor: 'N/A',
    skills: ['Ethics', 'Policy Analysis', 'Debate'],
    interests: ['Philosophy', 'Politics', 'Hiking'],
    tindarIndex: 76,
  },
  {
    id: 14,
    name: 'Joseph Robinson',
    image: 'https://via.placeholder.com/150',
    major: 'Biology',
    minor: 'N/A',
    skills: ['Lab Work', 'Research', 'Data Analysis'],
    interests: ['Biology', 'Fishing', 'Camping'],
    tindarIndex: 65,
  },
  {
    id: 15,
    name: 'Susan Clark',
    image: 'https://via.placeholder.com/150',
    major: 'Chem',
    minor: 'Biology',
    skills: ['Analytical Chemistry', 'Lab Techniques', 'Research'],
    interests: ['Science', 'Gardening', 'Running'],
    tindarIndex: 70,
  },
  {
    id: 16,
    name: 'Daniel Lewis',
    image: 'https://via.placeholder.com/150',
    major: 'Physics',
    minor: 'Math',
    skills: ['Data Analysis', 'Quantum Mechanics', 'Coding'],
    interests: ['Astronomy', 'Chess', 'Biking'],
    tindarIndex: 88,
  },
  {
    id: 17,
    name: 'Jessica Lee',
    image: 'https://via.placeholder.com/150',
    major: 'EARS',
    minor: 'Environmental Science',
    skills: ['GIS', 'Field Research', 'Data Analysis'],
    interests: ['Nature', 'Photography', 'Kayaking'],
    tindarIndex: 83,
  },
  {
    id: 18,
    name: 'Paul Walker',
    image: 'https://via.placeholder.com/150',
    major: 'Gov',
    minor: 'Economics',
    skills: ['Political Analysis', 'Public Speaking', 'Research'],
    interests: ['Politics', 'Travel', 'Music'],
    tindarIndex: 75,
  },
  {
    id: 19,
    name: 'Karen Hall',
    image: 'https://via.placeholder.com/150',
    major: 'ENVS',
    minor: 'N/A',
    skills: ['Environmental Science', 'Policy Analysis', 'Field Work'],
    interests: ['Hiking', 'Environmentalism', 'Yoga'],
    tindarIndex: 79,
  },
  {
    id: 20,
    name: 'Matthew Allen',
    image: 'https://via.placeholder.com/150',
    major: 'CS',
    minor: 'Philosophy',
    skills: ['Full-Stack Development', 'AI', 'Java'],
    interests: ['Coding', 'Philosophy', 'Gaming'],
    tindarIndex: 91,
  },
];

function Recruiting() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');

  useEffect(() => {
    // Simulate fetching data from a database
    setCards(mockData);
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      console.log(direction === 'right' ? 'Liked' : 'Disliked', cards[currentIndex].name);
      setSwipeDirection('');
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentIndex(nextIndex);
    }, 500); // Duration should match the CSS transition time
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="recruiting-container">
      {cards.length > 0 && (
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
                <img alt={cards[currentIndex].name} src={cards[currentIndex].image} className="card-image" />
                <div className="text-overlay">
                  <div className="text-content">
                    <span className="card-meta-title">{cards[currentIndex].name}</span>
                    <div className="card-meta-subtitle">Major: {cards[currentIndex].major}</div>
                    <div className="card-meta-subtitle">Minor: {cards[currentIndex].minor}</div>
                    <div className="card-meta-subtitle">Skills: {cards[currentIndex].skills.join(', ')}</div>
                    <div className="card-meta-subtitle">Interests: {cards[currentIndex].interests.join(', ')}</div>
                    <div className="card-meta-subtitle">Tindar Index: {cards[currentIndex].tindarIndex}</div>
                  </div>
                </div>
              </div>
            )}
            style={{ width: 300, margin: '0 auto', textAlign: 'center' }}
          />
        </div>
      )}
      <div className="buttons-container">
        <Button onClick={() => handleSwipe('left')}>No</Button>
        <Button onClick={() => handleSwipe('right')}>Yes</Button>
      </div>
      <NavBar />
    </div>
  );
}

export default Recruiting;
