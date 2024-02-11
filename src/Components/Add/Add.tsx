import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import '../../Styles/Form.css';
import Swal from 'sweetalert2';

interface AddProps {
  onClose: () => void;
}

const Add: React.FC<AddProps> = ({ onClose }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const PopUpRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [body, setBody] = useState<string>('');

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

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleAddButtonClick = () => {

    try{
      if(userId.trim() === '' || title.trim() === '' || body.trim() === ''){
        Swal.fire("Fill All required field before click ADD button!");
        return;
      }
      Swal.fire({
        title: "Do you want to Delete?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't Save!`
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
      console.log('Title:', title);
      console.log('UserId:', userId);
      console.log('Body:', body);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your data has been saved!",
        showConfirmButton: false,
        timer: 1500
      });
        } else if (result.isDenied) {
          Swal.fire("Save cansel!", "", "info");
        }
      });
    }catch(err){
      console.error("Cant Send Data to server: ", err);
    }

};

  return (
    <div className='content'>
      <div className='popup-form'>
        {showAddForm && (
          <div ref={PopUpRef}>
            <form className='form'>
              <div className='userIdArea'>
                <label htmlFor="userId">UserId:</label>
                <input id='userId' type="text" placeholder='Eg:- S***' value={userId} onChange={handleUserIdChange} />
              </div>
              <div className='titleArea'>
                <label htmlFor="title">Title:</label>
                <input id='title' type="text" value={title} onChange={handleTitleChange} />
              </div>
              <div className='bodyArea'>
                <label htmlFor="body">Body:</label>
                <textarea id='bodyArea' value={body} onChange={handleBodyChange} />
              </div>
            </form>
            <div className='buttonArea'>
              <button className='buttonAdd' type='button' onClick={handleAddButtonClick}>ADD</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
