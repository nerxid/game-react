import React, { useState } from 'react';

const QuestionStatsTab = ({ questionStats }) => {
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter question stats by selected level and search term
    const filteredStats = questionStats.filter(stat => 
        (selectedLevel === 'all' || stat.level === selectedLevel) &&
        (searchTerm === '' || stat.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Separate stats by level
    const easyStats = filteredStats.filter(stat => stat.level === 'easy');
    const normalStats = filteredStats.filter(stat => stat.level === 'normal');
    const hardStats = filteredStats.filter(stat => stat.level === 'hard');

    // Calculate correct and incorrect answers for each level
    const getStatsSummary = (stats) => {
        let correct = 0;
        let incorrect = 0;
        stats.forEach(stat => {
            if (stat.result === 'correct') {
                correct++;
            } else {
                incorrect++;
            }
        });
        return { correct, incorrect };
    };

    return (
        <div className="question-stats-tab container my-4">
            <h2 className="text-center mb-4">Question Stats</h2>

            {/* Level Filter */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Filter by Level:</label>
                    <select 
                        className="form-select" 
                        onChange={(e) => setSelectedLevel(e.target.value)} 
                        value={selectedLevel}
                    >
                        <option value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* Username Search Filter */}
                <div className="col-md-6">
                    <label className="form-label">Search by Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            {/* Easy Stats Section */}
            {(selectedLevel === 'all' || selectedLevel === 'easy') && (
                <div className="level-section mb-4">
                    <h3>Easy</h3>
                    <table className="table table-striped table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Question ID</th>
                                <th>Result</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {easyStats.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.username}</td>
                                    <td>{stat.question_id}</td>
                                    <td>{stat.result}</td>
                                    <td>{new Date(stat.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Correct:</strong> {getStatsSummary(easyStats).correct}, <strong>Incorrect:</strong> {getStatsSummary(easyStats).incorrect}</p>
                </div>
            )}

            {/* Normal Stats Section */}
            {(selectedLevel === 'all' || selectedLevel === 'normal') && (
                <div className="level-section mb-4">
                    <h3>Normal</h3>
                    <table className="table table-striped table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Question ID</th>
                                <th>Result</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {normalStats.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.username}</td>
                                    <td>{stat.question_id}</td>
                                    <td>{stat.result}</td>
                                    <td>{new Date(stat.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Correct:</strong> {getStatsSummary(normalStats).correct}, <strong>Incorrect:</strong> {getStatsSummary(normalStats).incorrect}</p>
                </div>
            )}

            {/* Hard Stats Section */}
            {(selectedLevel === 'all' || selectedLevel === 'hard') && (
                <div className="level-section mb-4">
                    <h3>Hard</h3>
                    <table className="table table-striped table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Question ID</th>
                                <th>Result</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hardStats.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.username}</td>
                                    <td>{stat.question_id}</td>
                                    <td>{stat.result}</td>
                                    <td>{new Date(stat.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Correct:</strong> {getStatsSummary(hardStats).correct}, <strong>Incorrect:</strong> {getStatsSummary(hardStats).incorrect}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionStatsTab;
