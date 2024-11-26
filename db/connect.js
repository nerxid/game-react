const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Add this to parse JSON request body

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL user
    password: '', // Replace with your MySQL password
    database: 'game' // Your database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

// Fetch data from the database
app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM score_easy'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Send the results as JSON
    });
});

// Update high score in the database
// Update high score in the database
app.post('/api/updateEasy', (req, res) => {
    const { username, score } = req.body;

    // Step 1: Check if the user already exists in the database
    const checkUserSql = 'SELECT * FROM score_easy WHERE username = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            console.error('Error checking if user exists:', err);
            return res.status(500).send('Error checking if user exists');
        }

        if (results.length > 0) {
            // Step 2: If user exists, update the score
            const updateSql = 'UPDATE score_easy SET score = ? WHERE username = ?';
            db.query(updateSql, [score, username], (err, result) => {
                if (err) {
                    console.error('Error updating score:', err);
                    return res.status(500).send('Error updating score');
                }
                res.status(200).send('Score updated!');
            });
        } else {
            // Step 3: If the user doesn't exist, insert the new score
            const insertSql = 'INSERT INTO score_easy (username, score) VALUES (?, ?)';
            db.query(insertSql, [username, score], (err, result) => {
                if (err) {
                    console.error('Error adding score:', err);
                    return res.status(500).send('Error adding score');
                }

                // Step 4: If there are more than 10 entries, delete the lowest score
                const fetchTopScoresSql = 'SELECT * FROM score_easy ORDER BY score DESC LIMIT 10';
                db.query(fetchTopScoresSql, (err, results) => {
                    if (err) {
                        console.error('Error fetching top scores:', err);
                        return res.status(500).send('Error fetching top scores');
                    }

                    if (results.length > 10) {
                        const deleteSql = 'DELETE FROM score_easy WHERE id = ?';
                        db.query(deleteSql, [results[results.length - 1].id], (err, result) => {
                            if (err) {
                                console.error('Error deleting lowest score:', err);
                            }
                        });
                    }

                    res.status(200).send('Score added and leaderboard updated!');
                });
            });
        }
    });
});

app.post('/api/updateHard', (req, res) => {
    const { username, score } = req.body;

    // Step 1: Check if the user already exists in the database
    const checkUserSql = 'SELECT * FROM score_hard WHERE username = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            console.error('Error checking if user exists:', err);
            return res.status(500).send('Error checking if user exists');
        }

        if (results.length > 0) {
            // Step 2: If user exists, update the score
            const updateSql = 'UPDATE score_hard SET score = ? WHERE username = ?';
            db.query(updateSql, [score, username], (err, result) => {
                if (err) {
                    console.error('Error updating score:', err);
                    return res.status(500).send('Error updating score');
                }
                res.status(200).send('Score updated!');
            });
        } else {
            // Step 3: If the user doesn't exist, insert the new score
            const insertSql = 'INSERT INTO score_hard (username, score) VALUES (?, ?)';
            db.query(insertSql, [username, score], (err, result) => {
                if (err) {
                    console.error('Error adding score:', err);
                    return res.status(500).send('Error adding score');
                }

                // Step 4: If there are more than 10 entries, delete the lowest score
                const fetchTopScoresSql = 'SELECT * FROM score_hard ORDER BY score DESC LIMIT 10';
                db.query(fetchTopScoresSql, (err, results) => {
                    if (err) {
                        console.error('Error fetching top scores:', err);
                        return res.status(500).send('Error fetching top scores');
                    }

                    if (results.length > 10) {
                        const deleteSql = 'DELETE FROM score_hard WHERE id = ?';
                        db.query(deleteSql, [results[results.length - 1].id], (err, result) => {
                            if (err) {
                                console.error('Error deleting lowest score:', err);
                            }
                        });
                    }

                    res.status(200).send('Score added and leaderboard updated!');
                });
            });
        }
    });
});

app.post('/api/updateNormal', (req, res) => {
    const { username, score } = req.body;

    // Step 1: Check if the user already exists in the database
    const checkUserSql = 'SELECT * FROM score_normal WHERE username = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            console.error('Error checking if user exists:', err);
            return res.status(500).send('Error checking if user exists');
        }

        if (results.length > 0) {
            // Step 2: If user exists, update the score
            const updateSql = 'UPDATE score_normal SET score = ? WHERE username = ?';
            db.query(updateSql, [score, username], (err, result) => {
                if (err) {
                    console.error('Error updating score:', err);
                    return res.status(500).send('Error updating score');
                }
                res.status(200).send('Score updated!');
            });
        } else {
            // Step 3: If the user doesn't exist, insert the new score
            const insertSql = 'INSERT INTO score_normal (username, score) VALUES (?, ?)';
            db.query(insertSql, [username, score], (err, result) => {
                if (err) {
                    console.error('Error adding score:', err);
                    return res.status(500).send('Error adding score');
                }

                // Step 4: If there are more than 10 entries, delete the lowest score
                const fetchTopScoresSql = 'SELECT * FROM score_normal ORDER BY score DESC LIMIT 10';
                db.query(fetchTopScoresSql, (err, results) => {
                    if (err) {
                        console.error('Error fetching top scores:', err);
                        return res.status(500).send('Error fetching top scores');
                    }

                    if (results.length > 10) {
                        const deleteSql = 'DELETE FROM score_normal WHERE id = ?';
                        db.query(deleteSql, [results[results.length - 1].id], (err, result) => {
                            if (err) {
                                console.error('Error deleting lowest score:', err);
                            }
                        });
                    }

                    res.status(200).send('Score added and leaderboard updated!');
                });
            });
        }
    });
});
app.get('/api/data/:mode', (req, res) => {
    const mode = req.params.mode; // ดึงโหมดจาก URL
    let sql = 'SELECT * FROM score_easy ORDER BY score DESC'; // เรียงจากมากไปน้อย

    // เปลี่ยน SQL query ตามโหมดที่เลือก และเรียงจากมากไปน้อย
    if (mode === 'normal') {
      sql = 'SELECT * FROM score_normal ORDER BY score DESC';
    } else if (mode === 'hard') {
      sql = 'SELECT * FROM score_hard ORDER BY score DESC';
    }
    
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching high scores:', err);
        return res.status(500).send('Error fetching high scores');
      }
      res.json(results); // ส่งข้อมูลกลับไปยัง frontend
    });
  });
  


app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send(err);
      }
      res.status(200).send('User registered successfully');
    });
});

app.post('/api/checkemail', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send(err);
      }
      res.status(200).send('User registered successfully');
    });
});


// เพิ่มใน server.js หรือไฟล์เซิร์ฟเวอร์ของคุณ
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT username FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in');
        }
        if (results.length > 0) {
            res.status(200).json({ username: results[0].username }); // ส่ง username กลับ
        } else {
            res.status(401).send('Invalid email or password'); // ส่งกลับถ้าไม่มีผู้ใช้
        }
    });
});

app.post('/api/saveQuestionStats', (req, res) => {
    const { username, questionStats } = req.body;

    // Validate input data
    if (!username || !Array.isArray(questionStats) || questionStats.length === 0) {
        return res.status(400).send('Invalid request data');
    }

    // Prepare SQL to insert question stats
    const sql = 'INSERT INTO question_stats (username, question_id, result) VALUES ?';

    // Map the questionStats array to an array of values for batch insertion
    const values = questionStats.map(stat => [username, stat.questionId, stat.result]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error saving question stats:', err);
            return res.status(500).send('Error saving question stats');
        }
        res.status(200).send('Question stats saved successfully');
    });
});



app.post('/api/savequestion_statsnormal', (req, res) => {
    const { username, questionStats } = req.body;

    // Validate input data
    if (!username || !Array.isArray(questionStats) || questionStats.length === 0) {
        return res.status(400).send('Invalid request data');
    }

    // Prepare SQL to insert question stats
    const sql = 'INSERT INTO question_statsnormal (username, question_id, result) VALUES ?';

    // Map the questionStats array to an array of values for batch insertion
    const values = questionStats.map(stat => [username, stat.questionId, stat.result]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error saving question stats:', err);
            return res.status(500).send('Error saving question stats');
        }
        res.status(200).send('Question stats saved successfully');
    });
});


app.post('/api/savequestion_statshard', (req, res) => {
    const { username, questionStats } = req.body;

    // Validate input data
    if (!username || !Array.isArray(questionStats) || questionStats.length === 0) {
        return res.status(400).send('Invalid request data');
    }

    // Prepare SQL to insert question stats
    const sql = 'INSERT INTO question_statshard (username, question_id, result) VALUES ?';

    // Map the questionStats array to an array of values for batch insertion
    const values = questionStats.map(stat => [username, stat.questionId, stat.result]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error saving question stats:', err);
            return res.status(500).send('Error saving question stats');
        }
        res.status(200).send('Question stats saved successfully');
    });
});


app.get('/api/question-stats', (req, res) => {
    const query = `
      SELECT 'easy' AS level, username, question_id, result, timestamp FROM question_stats
      UNION ALL
      SELECT 'normal', username, question_id, result, timestamp FROM question_statsnormal
      UNION ALL
      SELECT 'hard', username, question_id, result, timestamp FROM question_statshard
    `;
    db.query(query, (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });
  

  app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });
  
  // API เพื่อดึงข้อมูลคะแนน
  app.get('/api/scores', (req, res) => {
    const query = `
      SELECT 'easy' AS level, username, score FROM score_easy
      UNION ALL
      SELECT 'normal', username, score FROM score_normal
      UNION ALL
      SELECT 'hard', username, score FROM score_hard
    `;
    db.query(query, (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});