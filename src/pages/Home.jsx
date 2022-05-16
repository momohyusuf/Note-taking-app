import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteNote, saveNoteToLocalStorage } from '../features/note/noteSlice';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';

function Home() {
  const { note } = useSelector((state) => state.note);
  useEffect(() => {
    dispatch(saveNoteToLocalStorage());
  }, [note]);
  const dispatch = useDispatch();
  if (note.length <= 0) {
    return (
      <section className="welcome--page">
        <div>
          <h1>Your Note is Empty</h1>
          <Link to="createnote">
            <p>Create a new note</p>{' '}
            <span>
              <FaEdit className="create--note-icon" />
            </span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="App">
      <section className="note--header">
        <h1>All Notes</h1>
        <p>
          {note.length} {note.length === 1 ? 'note' : 'notes'}
        </p>
      </section>

      <div className="notes--container">
        {note.map((item) => {
          return (
            <article className="notes" key={item.id}>
              <h3 className="note--title">{item.body.slice(0, 10)}...</h3>
              <p className="note--text">{item.body.slice(0, 80)}...</p>
              <p className="note--date">created on {item.date}</p>

              <button onClick={() => dispatch(deleteNote(item.id))}>
                <MdDelete className="note--delete-icon" />
              </button>
              <Link to={item.id}>
                <button>
                  <MdRemoveRedEye className="view--note--icon" />{' '}
                </button>
              </Link>
            </article>
          );
        })}
      </div>

      <div>
        <Link to="createnote">
          <div className="create--note--btn">
            <FaEdit />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
