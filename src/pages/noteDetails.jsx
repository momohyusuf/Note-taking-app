import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editNote } from '../features/note/noteSlice';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { MdModeEditOutline } from 'react-icons/md';
import { toggleIsShown } from '../features/note/noteSlice';

function NoteDetails() {
  const { note } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const noteBody = note.find((item) => item.id === noteId);
  const { id } = noteBody;

  return (
    <div>
      <MarkdownPreview source={noteBody.body} className="markdown--previewer" />
      <Link to="/createnote">
        <div
          className="edit--note--btn"
          onClick={() => {
            dispatch(editNote(id));
            dispatch(toggleIsShown());
          }}
        >
          {' '}
          <MdModeEditOutline />{' '}
        </div>
      </Link>
    </div>
  );
}

export default NoteDetails;
