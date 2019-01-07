import React from 'react';

import { Button } from '../base-ui';

import { NotePreview__ } from './styled';

export class NotePreview extends React.Component<any, any> {
  render() {
    const { note, openEditor, removeNote } = this.props;

    return (
      <NotePreview__>
        <Button text={note.title} onClick={() => openEditor(note)} styleMode={'note'} />
        <Button text='×' onClick={() => removeNote(note.id)} styleMode={'remove-note'} />
      </NotePreview__>
    );
  }
}
