import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteDetails from './pages/noteDetails';
import CreateNote from './pages/createNote';
import SharedLayout from './components/SharedLayout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="createnote" element={<CreateNote />} />
        <Route path=":noteId" element={<NoteDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
