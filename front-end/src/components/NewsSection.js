import React from 'react';

const NewsSection = () => {
  const news = [
    { title: 'MoU with Goa Government (Sarla)', date: '2025-12-01' },
    { title: 'Archer Midnight Production Update', date: '2025-11-15' },
    { title: 'EHang AAV Certification Milestone', date: '2025-10-20' },
    { title: 'Aridge Freedom to Fly Campaign', date: '2025-09-10' }
  ];

  return (
    <section style={{ padding: '40px 20px' }}>
      <h2>Latest News</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {news.map((item, index) => (
          <li key={index} className="card">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            <button>Read More</button>
          </li>
        ))}
      </ul>
      <button>Show All Campaigns</button>
    </section>
  );
};

export default NewsSection;