import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bugs');
      setBugs(response.data);
    } catch (err) {
      setError('Error fetching bugs');
      console.error('Error:', err);
    }
  };

  const handleStatusChange = async (bugId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/bugs/${bugId}`, {
        status: newStatus
      });
      fetchBugs(); // Refresh the list
    } catch (err) {
      setError('Error updating bug status');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (bugId) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bugs/${bugId}`);
        fetchBugs(); // Refresh the list
      } catch (err) {
        setError('Error deleting bug');
        console.error('Error:', err);
      }
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="bug-list">
      <h2>Reported Bugs</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <div className="bug-grid">
          {bugs.map(bug => (
            <div key={bug._id} className={`bug-card ${bug.status}`}>
              <h3>{bug.title}</h3>
              <p>{bug.description}</p>
              <div className="bug-meta">
                <span className={`priority ${bug.priority}`}>
                  Priority: {bug.priority}
                </span>
                <span className={`status ${bug.status}`}>
                  Status: {bug.status}
                </span>
              </div>
              <div className="bug-actions">
                <select
                  value={bug.status}
                  onChange={(e) => handleStatusChange(bug._id, e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => handleDelete(bug._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BugList; 