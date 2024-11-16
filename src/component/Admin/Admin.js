import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTab from './UsersTab';
import ScoresTab from './ScoresTab';
import QuestionStatsTab from './QuestionStatsTab';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [scores, setScores] = useState([]);
    const [questionStats, setQuestionStats] = useState([]);
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get('http://localhost:5000/api/scores')
            .then(response => setScores(response.data))
            .catch(error => console.error('Error fetching scores:', error));

        axios.get('http://localhost:5000/api/question-stats')
            .then(response => setQuestionStats(response.data))
            .catch(error => console.error('Error fetching question stats:', error));
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Users</button>
                <button onClick={() => setActiveTab('scores')} className={activeTab === 'scores' ? 'active' : ''}>Scores</button>
                <button onClick={() => setActiveTab('questionStats')} className={activeTab === 'questionStats' ? 'active' : ''}>Question Stats</button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && <UsersTab users={users} />}
                {activeTab === 'scores' && <ScoresTab scores={scores} />}
                {activeTab === 'questionStats' && <QuestionStatsTab questionStats={questionStats} />}
            </div>
        </div>
    );
};

export default Admin;
