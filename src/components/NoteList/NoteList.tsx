import React from 'react';
import ReactModal from 'react-modal';
import { Dispatch } from 'redux';
import { Note } from '../../store/reducer';
import { facadeActions } from '../../store/actions';

import { Button } from '../base-ui';
import { NoteEditor } from '../NoteEditor';

interface NoteListProps {
  dispatch: Dispatch;
  notes: Note[];
  tabId: string;
}

export class NoteList extends React.Component<NoteListProps> {
  state = {
    showEditor: false,
    noteToEdit: null,
  };

  componentDidUpdate(prevProps) {
    const { notes, tabId } = this.props;

    if (prevProps.tabId === tabId && prevProps.notes.length < notes.length) {
      this.openEditor(notes[notes.length - 1]);
    }
  }

  openEditor = (note: Note) => this.setState({ showEditor: true, noteToEdit: note });

  closeEditor = () => this.setState({ showEditor: false });

  addNote = () => {
    const { tabId, dispatch } = this.props;

    dispatch(facadeActions.addNote(tabId));
  };

  removeNote = (noteId) => {
    const { tabId, dispatch } = this.props;

    dispatch(facadeActions.removeNote(tabId, noteId));
  };

  render() {
    const { notes, dispatch } = this.props;
    const { showEditor, noteToEdit } = this.state;

    const modalProps = {
      isOpen: showEditor,
      ariaHideApp: false,
      onRequestClose: this.closeEditor,
    };

    return (
      <div>
        {notes.map((n) => (
          <div key={n.id}>
            {/* TODO: move to NotePreview.tsx */}
            <Button text={n.title} onClick={() => this.openEditor(n)} />
            <Button text='×' onClick={() => this.removeNote(n.id)} />
          </div>
        ))}
        <Button icon={'add'} styleMode={'task-add'} onClick={this.addNote} />
        <ReactModal {...modalProps}>{noteToEdit && <NoteEditor note={noteToEdit} dispatch={dispatch} />}</ReactModal>
      </div>
    );
  }
}
