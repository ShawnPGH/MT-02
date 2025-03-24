import React, { useState } from 'react';
import Leaderboard from './Tracker';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [dietPlan, setDietPlan] = useState('');
    const [goal, setGoal] = useState('');
    const [steps, setSteps] = useState(0);

    const handleRegister = () => {
        setRegisteredUsers([...registeredUsers, { username, password }]);
        setIsRegistering(false);
    };

    const handleLogin = () => {
        const userExists = registeredUsers.find(user => user.username === username && user.password === password);
        if (userExists) {
            setIsLoggedIn(true);
        } else {
            alert("Invalid Username or Password");
        }
    };

    const handleLogout = () => setIsLoggedIn(false);
    const handleExit = () => window.close();

    const addParticipant = (name, score) => {
        const newParticipant = {
            name,
            score,
            exercise: exerciseName,
            diet: dietPlan,
            goal,
            steps,
        };
        setParticipants([...participants, newParticipant]);
    };

    const updateLeaderboard = () => {
        const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
        setLeaderboardData(sortedParticipants);
    };

    return (
        <div className="App" style={{ backgroundColor: '#6A5ACD', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={{ backgroundColor: '#1E1E2F', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', width: '450px' }}>
                {!isLoggedIn ? (
                    <div className="auth-container">
                        <h1 style={{ color: 'white', fontSize: '28px' }}>{isRegistering ? "Register" : "Login"}</h1>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {isRegistering ? (
                            <>
                                <button style={{ backgroundColor: '#6A5ACD', color: 'white' }} onClick={handleRegister}>Sign Up</button>
                                <button style={{ backgroundColor: '#6A5ACD', color: 'white' }} onClick={() => setIsRegistering(false)}>Back to Login</button>
                            </>
                        ) : (
                            <>
                                <button style={{ backgroundColor: '#6A5ACD', color: 'white' }} onClick={handleLogin}>Login</button>
                                <button style={{ backgroundColor: '#6A5ACD', color: 'white' }} onClick={() => setIsRegistering(true)}>Sign Up</button>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <h1 className="title" style={{ color: 'white', textAlign: 'center', fontSize: '28px' }}>Fitness Challenge Tracker</h1>
                        <button onClick={handleLogout} className="logout-button" style={{ backgroundColor: '#6A5ACD', color: 'white' }}>Logout</button>
                        <button onClick={handleExit} className="exit-button" style={{ backgroundColor: '#6A5ACD', color: 'white' }}>Exit</button>
                        <div className="exercise-container">
                            <label className="exercise-label">Select Exercise:</label>
                            <select value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} className="exercise-select">
                                <option value="">Select Exercise</option>
                                <option value="Push-up">Push-up</option>
                                <option value="Sit-up">Sit-up</option>
                                <option value="Pull-up">Pull-up</option>
                                <option value="Squat">Squat</option>
                                <option value="Deadlift">Deadlift</option>
                                <option value="Plank">Plank</option>
                                <option value="Mountain Climbers">Mountain Climbers</option>
                                <option value="Lunges">Lunges</option>
                            </select>
                        </div>
                        <div className="diet-container">
                            <label className="diet-label">Enter Customized Diet Plan:</label>
                            <input type="text" placeholder="Diet Plan" value={dietPlan} onChange={(e) => setDietPlan(e.target.value)} className="diet-input" />
                        </div>
                        <div className="goal-container">
                            <label className="goal-label">Set Your Goal:</label>
                            <input type="text" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="goal-input" />
                        </div>
                        <div className="steps-container">
                            <label className="steps-label">Track Number of Steps:</label>
                            <input type="number" placeholder="Steps" value={steps} onChange={(e) => setSteps(e.target.value)} className="steps-input" />
                        </div>
                        <ParticipantForm addParticipant={addParticipant} updateLeaderboard={updateLeaderboard} />
                        <Leaderboard leaderboardData={leaderboardData} />
                    </>
                )}
            </div>
        </div>
    );
}

function ParticipantForm({ addParticipant, updateLeaderboard }) {
    const [name, setName] = useState('');
    const [score, setScore] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        addParticipant(name, score);
        updateLeaderboard();
        setName('');
        setScore(0);
    };

    return (
        <form onSubmit={handleSubmit} className="participant-form">
            <input type="text" placeholder="Participant Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} required />
            <button type="submit" style={{ backgroundColor: '#6A5ACD', color: 'white' }}>Add Participant</button>
        </form>
    );
}

export default App;
