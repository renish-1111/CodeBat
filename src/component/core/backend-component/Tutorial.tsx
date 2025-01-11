import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Tutorial {
  id: number;
  index: number;
  language: string;
  title: string;
}

const TutorialPanel = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [tutorialID, setTutorialID] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/addTutorial');
  };

  const handleEdit = () => {
    if (tutorialID) {
      setLoadingAction(true);
      navigate(`/admin/editTutorial/${tutorialID}`);
    } else {
      alert('Please enter a tutorial ID to edit');
    }
  };

  const handleDelete = () => {
    if (tutorialID) {
      setLoadingAction(true);
      navigate(`/admin/deleteTutorial/${tutorialID}`);
    } else {
      alert('Please enter a tutorial ID to delete');
    }
  };

  const fetchTutorials = async () => {
    const user_id = localStorage.getItem('userId');
    setLoadingAction(true);
    try {
      const response = await axios.get(`http://localhost:5000/admin/tutorial/?user_id=${user_id}`);
      console.log('Tutorials:', response.data.tutorials);
      setTutorials(response.data.tutorials || []); // Ensure array assignment
    } catch (err) {
      console.error('Error fetching tutorials:', err);
      setTutorials([]);
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // Group tutorials by language and sort by index
  const groupedTutorials = tutorials.reduce((groups, tutorial) => {
    const { language } = tutorial;
    if (!groups[language]) {
      groups[language] = [];
    }
    groups[language].push(tutorial);
    groups[language].sort((a, b) => a.index - b.index); // Sort by index
    return groups;
  }, {} as Record<string, Tutorial[]>);

  return (
    <div className="min-h-screen p-4 mt-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Tutorials</h1>

      <div className="mb-4">
        <input
          type="text"
          value={tutorialID}
          onChange={(e) => setTutorialID(e.target.value)}
          placeholder="Enter tutorial ID"
          className="w-full bg-zinc-600 p-3 mb-3 rounded"
        />
      </div>

      <div className="row flex gap-4 mb-6">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Add Tutorial'}
        </button>
        <button
          onClick={handleEdit}
          className="bg-amber-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Edit Tutorial'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Delete Tutorial'}
        </button>
      </div>

      <div className="overflow-x-auto">
        {Object.keys(groupedTutorials).length > 0 ? (
          Object.entries(groupedTutorials).map(([language, tutorials]) => (
            <div key={language} className="mb-8">
              <h2 className="text-4xl font-semibold ml-3 mb-4 ">{language}</h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 md:w-32 px-4 py-2 text-left text-lg font-semibold">
                      Tutorial ID
                    </th>
                    <th className="border border-gray-300 md:w-32 px-4 py-2 text-left text-lg font-semibold">
                      Index
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tutorials.map((tut) => (
                    <tr key={tut.index} className="hover:bg-stone-600">
                      <td className="border border-gray-300 px-4 py-2">{tut.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{tut.index}</td>
                      <td className="border border-gray-300 px-4 py-2">{tut.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg mt-4">No tutorials available.</p>
        )}
      </div>
    </div>
  );
};

export default TutorialPanel;
