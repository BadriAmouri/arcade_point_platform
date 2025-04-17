import React, { useState, useEffect } from 'react';

const SubmitPointsForm = () => {
  const [teamName, setTeamName] = useState('');
  const [gameName, setGameName] = useState('');
  const [points, setPoints] = useState('');
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false); // for spinner

  // Dynamic password mapping
  const passwordMap = {
    'Balance_game': 'halla1',
    'Escape_room': 'Rahim2',
    'Math': 'Yasser3',
    'Maze': 'Manel4',
    'The_Floor_is_lava': 'Rosa5',
    'Chess': 'Aymen6',
    'Face_Blocks': 'Yasmine7',
    'FIFA': 'Badri8',
    'Team_feud': 'Maissa9',
    'Tresor': 'Doua10',
    'Meme_It': 'Souumia11',
  };

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
    const expectedPassword = passwordMap[gameName];
    if (!expectedPassword) return true; // no password required
    return password === expectedPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      alert('❌ Incorrect password for the selected game.');
      return;
    }

    const dataToSend = {
      team_name: teamName,
      game_name: gameName,
      points: parseInt(points),
    };

    try {
      setLoading(true); // start spinner

      const response = await fetch('https://arcade-backend-ckdw.vercel.app/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      setLoading(false); // stop spinner

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit points');
      }

      alert('✅ Score submitted successfully!');
    } catch (error) {
      setLoading(false); // stop spinner
      alert(`❌ ${error.message}`);
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
          <button
            type="submit"
            className="btn font-Ocr text-center flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitPointsForm;
