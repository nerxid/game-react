import React, { useState } from 'react';
import './ScoresTab.css';

const ScoresTab = ({ scores }) => {
    const [selectedLevel, setSelectedLevel] = useState('all');

    // Filter scores by the selected level
    const filteredScores = selectedLevel === 'all'
        ? scores
        : scores.filter(score => score.level === selectedLevel);

    // Separate scores by level
    const easyScores = filteredScores.filter(score => score.level === 'easy');
    const normalScores = filteredScores.filter(score => score.level === 'normal');
    const hardScores = filteredScores.filter(score => score.level === 'hard');

    // Sort the scores in descending order
    const sortScores = (scoreList) => {
        return [...scoreList].sort((a, b) => b.score - a.score);
    };

    return (
        <div className="scores-tab">
            <h2>Scores</h2>
            
            {/* Level Filter */}
            <div className="score-filters">
                <label>Filter by Level: </label>
                <select onChange={(e) => setSelectedLevel(e.target.value)} value={selectedLevel}>
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* Score Tables by Level */}
            {selectedLevel === 'all' || selectedLevel === 'easy' ? (
                <div className="level-section">
                    <h3>Easy</h3>
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortScores(easyScores).map((score, index) => (
                                <tr key={index}>
                                    <td>{score.username}</td>
                                    <td>{score.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {selectedLevel === 'all' || selectedLevel === 'normal' ? (
                <div className="level-section">
                    <h3>Normal</h3>
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortScores(normalScores).map((score, index) => (
                                <tr key={index}>
                                    <td>{score.username}</td>
                                    <td>{score.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {selectedLevel === 'all' || selectedLevel === 'hard' ? (
                <div className="level-section">
                    <h3>Hard</h3>
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortScores(hardScores).map((score, index) => (
                                <tr key={index}>
                                    <td>{score.username}</td>
                                    <td>{score.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default ScoresTab;
