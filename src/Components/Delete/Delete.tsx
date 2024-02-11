import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import '../../Styles/Form.css';
import Swal from 'sweetalert2';

interface DeleteProps {
  onClose: () => void;
}

const Add: React.FC<DeleteProps> = ({ onClose }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const PopUpRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>('');

  const handleOutsideClick = (event: MouseEvent) => {
    if (PopUpRef.current && !PopUpRef.current.contains(event.target as Node)) {
      setShowAddForm(false);
      onClose(); // Call the onClose prop
    }
  };

  useEffect(() => {
    if (showAddForm) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAddForm]);

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleDeleteButtonClick = () => {

    if(userId.trim() === ''){
      Swal.fire("Fill UserId field before click DELETE button!");
        return;
    }
 
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete!`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
         method: 'DELETE',
        })
      .then((response) => response.json())
      .then((json) => console.log(json));; 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your data has been deleted",
        showConfirmButton: false,
        timer: 1500
      });
      } else if (result.isDenied) {
        Swal.fire("Delete cansel!", "", "info");
      }
    });
  };


  return (
    <div>
      <div>
        {showAddForm && (
          <div className='popup-form' ref={PopUpRef}>
            <form className='form'>
              <div className='userIdArea'>
                <label htmlFor="userId">UserId:</label>
                <input id='userId' type="text" placeholder='Eg:- S***' value={userId} onChange={handleUserIdChange} />
              </div>
            </form>
            <div className='buttonArea'>
              <button className='buttonAdd' type='button' onClick={handleDeleteButtonClick}>DELETE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
