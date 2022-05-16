import * as React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { Link } from 'react-router-dom';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewNote,
  saveUpadatedNote,
  toggleIsShown,
} from '../features/note/noteSlice';
import { MdSave } from 'react-icons/md';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function CreateNote() {
  const { note, editorText, isEditingNote, isShown } = useSelector(
    (state) => state.note
  );
  const [value, setValue] = React.useState(editorText);
  const [selectedTab, setSelectedTab] = React.useState('write');
  const dispatch = useDispatch();

  const createNote = () => {
    if (value === '') {
      return;
    } else {
      dispatch(createNewNote(value));
    }
  };

  const saveUpdated = () => {
    if (value === '') {
      return;
    } else {
      dispatch(saveUpadatedNote({ id: isEditingNote.id, value }));
      dispatch(toggleIsShown());
    }
  };
  return (
    <section>
      <div className="container editor">
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={100}
          heightUnits="vh"
        />
      </div>
      <Link to="/">
        {!isShown && (
          <div onClick={createNote} className="save--note--btn">
            <MdSave />
          </div>
        )}
        {isShown && (
          <div onClick={saveUpdated} className="save--edit--btn">
            <MdSave />
          </div>
        )}
      </Link>
    </section>
  );
}
