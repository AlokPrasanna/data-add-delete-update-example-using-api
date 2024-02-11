import React, { useRef, useState, useEffect } from 'react';
import '../../Styles/Form.css';

interface SeeAllProps {
  onClose: () => void;
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Add: React.FC<SeeAllProps> = ({ onClose }) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [AllDetails,setAllDetails] = useState<Post[]>([]);
  const PopUpRef = useRef<HTMLDivElement>(null);

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

  const GetAllDetails = () => {

    try{
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setAllDetails(data));

    }catch(err){
      console.error("Cant fetch Data! ", err);
    }
  }

  useEffect(() => {
    GetAllDetails();
  },[]);



  return (
    <div>
      <div>
        {showAddForm && (
            <div className='popup-form' ref={PopUpRef}>
              <table>
              <thead>
                <tr>
                  <th>DetaiId</th>
                  <th>User ID</th>
                  <th>Title</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {AllDetails.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.id}</td>
                    <td>{detail.userId}</td>
                    <td>{detail.title}</td>
                    <td>{detail.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        )}
      </div>
    </div>
  );
};

export default Add;
