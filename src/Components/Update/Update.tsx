import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import '../../Styles/Form.css';
import Swal from 'sweetalert2';

interface UpdateProps {
  onClose: () => void;
}

const Add: React.FC<UpdateProps> = ({onClose }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const PopUpRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [dataId, setDataId] = useState<string>('');

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

  const handleDataIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataId(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleUpdateButtonClick = () => {

    try{

      if(!dataId.trim() || !userId.trim()){
        Swal.fire("Fill required field before click UPDATE button!");
        return;
      }

      Swal.fire({
        title: "Do you want to update data?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `Don't Update`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if(title.trim() !== ''){
            fetch(`https://jsonplaceholder.typicode.com/posts/${dataId}`, {
              method: 'PATCH',
              body: JSON.stringify({
              title:title,
            }),
              headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
        }
        else if(body.trim() !== ''){
          fetch(`https://jsonplaceholder.typicode.com/posts/${dataId}`, {
            method: 'PATCH',
            body: JSON.stringify({
            body:body,
          }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
      }
      else if(body.trim() !== '' && title.trim() !== ''){
        fetch(`https://jsonplaceholder.typicode.com/posts/${dataId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title:title,
            body:body,
        }),
          headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    }
          Swal.fire("Updated!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Update canseled", "", "info");
        }
      });
    }catch(err){
      console.error("Cant Send Data to server: ", err);
    }

};
  return (
    <div>
      <div>
        {showAddForm && (
          <div className='popup-form' ref={PopUpRef}>
            <form className='form'>
            <div className='dataIdArea'>
                <label htmlFor="userId">DataId:</label>
                <input id='dataId' type="text" placeholder='Eg:-1' value={dataId} onChange={handleDataIdChange} required />
              </div>
              <div className='userIdArea'>
                <label htmlFor="userId">UserId:</label>
                <input id='userId' type="text" placeholder='Eg:- S***' value={userId} onChange={handleUserIdChange} required />
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
              <button className='buttonAdd' type='button' onClick={handleUpdateButtonClick}>UPDATE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
