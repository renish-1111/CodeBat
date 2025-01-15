import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Language {
    id: number;
    name: string;
    }

const Language = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageName, setLanguageName] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/addLanguage');
  };
  const handleEdit = () =>{
    if (languageName) {
      setLoadingAction(true);
      navigate(`/admin/editLanguage/${languageName}`);
    }
    else{
        alert("Please enter a language name to edit");
        }
  }

  const handleDelete = () => {
    if (languageName) {
      setLoadingAction(true);
      navigate(`/admin/deleteLanguage/${languageName}`);
    }
    else{
        alert("Please enter a language name to delete");
        }
  };


  
const fetchLanguages = async () => {
  const user_id = localStorage.getItem('userId');

  setLoadingAction(true);
  try {
    const response = await axios.get('/api/admin/languages/?user_id=' + user_id);
    setLanguages(response.data.languages);
  } catch (err) {
    console.error('Error fetching languages:', err);
  } finally {
    setLoadingAction(false);
  }
};

useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <div className="min-h-screen p-4 mt-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Languages</h1>

      <div className="mb-4">
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          placeholder="Enter language name"
          className="w-full bg-zinc-600 p-3 mb-3 rounded"
        />
      </div>

      <div className="row flex gap-4 mb-6">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Add Language'}
        </button>
        <button
          onClick={handleEdit}
          className="bg-amber-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Edit Language'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loadingAction}
        >
          {loadingAction ? 'Loading...' : 'Delete Language'}
        </button>
      </div>

      <div className="overflow-x-auto">
        {languages.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Language ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-lg font-semibold">Language Name</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang) => (
                <tr key={lang.id} className="hover:bg-stone-600">
                  <td className="border border-gray-300 px-4 py-2">{lang.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{lang.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-4">No languages available.</p>
        )}
      </div>
    </div>
  );
};

export default Language;
