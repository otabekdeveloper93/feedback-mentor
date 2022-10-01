import TodosProvider from './components/contexts/todos';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './assets/scss/main.scss';
import EditFeedback from './pages/edit-feedback/EditFeedback';
import CreateFeedback from './pages/createFeedback/CreateFeedback';
import CommentPage from './pages/commentPage/CommentPage';
import RoadContext from './components/contexts/RoadContext';

const App = () => {
  return (
    <>
      <TodosProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateFeedback />} />
          <Route path='/edit/:itemId' element={<EditFeedback />} />
          <Route path='/roadmap' element={<RoadContext />} />
          <Route path='/comments/:id' element={<CommentPage />} />
        </Routes>
      </TodosProvider>
    </>
  );
};

export default App;
