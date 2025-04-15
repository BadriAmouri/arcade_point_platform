import React, { useState, useEffect } from 'react';

const SubmitPointsForm = () => {
  const [teamName, setTeamName] = useState('');
  const [gameName, setGameName] = useState('');
  const [points, setPoints] = useState('');
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsRes = await fetch('https://arcade-backend-ckdw.vercel.app/api/teams');
        const gamesRes = await fetch('https://arcade-backend-ckdw.vercel.app/api/games');
        const teamsData = await teamsRes.json();
        const gamesData = await gamesRes.json();
        setTeams(teamsData);
        setGames(gamesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const isPasswordValid = () => {
    const passwordMap = {
      FIFA: '1',
      Squid_game: '123',
      MarioKart: 'abc',
      // Add more game-password pairs if needed
    };

    if (!passwordMap[gameName]) return true; // no password required for this game
    return password === passwordMap[gameName];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      alert('Incorrect password for the selected game.');
      return;
    }

    const dataToSend = {
      team_name: teamName,
      game_name: gameName,
      points: parseInt(points),
    };

    try {
      const response = await fetch('https://arcade-backend-ckdw.vercel.app/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit points');
      }

      console.log('Success:', result);
      alert('Score submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="SubmitPointsForm flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-3xl font-bold font-cyber text-gray-800 mb-6">Submit Game Points</h2>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-600 mb-1 font-Ocr">Team Name</label>
          <select
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-sm border-dashed focus:outline-none focus:ring-2 focus:ring-orange-500 font-Ocr"
            required
          >
            <option value="" disabled>Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>{team.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-Ocr">Game Name</label>
          <select
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-sm border-dashed focus:outline-none focus:ring-2 focus:ring-orange-500 font-Ocr"
            required
          >
            <option value="" disabled>Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.name}>{game.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-Ocr">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Enter points"
            className="w-full px-4 py-2 border border-gray-400 rounded-sm border-dashed focus:outline-none focus:ring-2 focus:ring-orange-500 font-Ocr"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1 font-Ocr">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter game password"
            className="w-full px-4 py-2 border border-gray-400 rounded-sm border-dashed font-Ocr"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <button type="submit" className="btn font-Ocr text-center">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitPointsForm;
