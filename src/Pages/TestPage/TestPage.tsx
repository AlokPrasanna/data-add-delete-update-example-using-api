import React, { useState } from 'react';
import Add from '../../Components/Add/Add';
import Delete from '../../Components/Delete/Delete';
import Update from '../../Components/Update/Update';
import SeeAll from '../../Components/SeeAll/SeeAll';
import '../../Styles/TestPage.css';

function TestPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSeeAll, setShowSeeAll] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowDeleteForm(false);
    setShowUpdateForm(false);
    setShowSeeAll(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteForm(true);
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowSeeAll(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSeeAll(false);
  };

  const handleSeeAllClick = () => {
    setShowSeeAll(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowUpdateForm(false);
  };

  return (
    <div className='content'>
        <div className='test-page'>
            <button type='button' className='button' onClick={handleAddClick}>Add</button>
            <button type='button' className='button' onClick={handleDeleteClick}>Delete</button>
            <button type='button' className='button' onClick={handleUpdateClick}>Update</button>
            <button type='button' className='button' onClick={handleSeeAllClick}>See All</button><br />
        </div>
      {showAddForm && <Add  onClose={() => setShowAddForm(false)} />}
      {showDeleteForm && <Delete onClose={() => setShowDeleteForm(false)} />}
      {showUpdateForm && <Update onClose={() => setShowUpdateForm(false)} />}
      {showSeeAll && <SeeAll onClose={() => setShowSeeAll(false)} />}     
   </div>
  );
}

export default TestPage;
