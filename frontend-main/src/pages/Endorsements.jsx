import React, { useState, useEffect } from 'react';
import { List, Avatar, Button } from 'antd';
import NavBar from '../components/NavBar';
import '../style/EndorsementsStyle.css';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    classYear: '2026',
    image: 'https://via.placeholder.com/150',
    resume: '#',
  },
  {
    id: 2,
    name: 'Jane Smith',
    classYear: '2026',
    image: 'https://via.placeholder.com/150',
    resume: '#',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    classYear: '2026',
    image: 'https://via.placeholder.com/150',
    resume: '#',
  },
  {
    id: 4,
    name: 'Robert Brown',
    classYear: '2026',
    image: 'https://via.placeholder.com/150',
    resume: '#',
  },
  {
    id: 5,
    name: 'Emily Davis',
    classYear: '2026',
    image: 'https://via.placeholder.com/150',
    resume: '#',
  },
];

function Endorsements() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the backend
    // Uncomment and adjust the following code to fetch data from your backend
    /*
    fetch('/api/endorsements')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
    */
    setData(mockData);
  }, []);

  return (
    <div className="endorsements-container">
      <h2>Endorsements</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[<Button key="list-loadmore-edit"><a href={item.resume} target="_blank" rel="noopener noreferrer">View Resume</a></Button>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.name}
              description={`Class of ${item.classYear}`}
            />
          </List.Item>
        )}
      />
      <NavBar />
    </div>
  );
}

export default Endorsements;
