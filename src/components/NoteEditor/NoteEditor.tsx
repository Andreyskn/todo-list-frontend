import React from 'react';

import { facadeActions } from '../../store/actions';

import { NoteEditor__ } from './styled';

export class NoteEditor extends React.Component<any> {
  state = {
    title: this.props.note.title,
    text: this.props.note.text,
  };

  componentWillUnmount() {
    const { title, text } = this.state;
    const { note, dispatch } = this.props;

    if (title !== note.title || text !== note.text) {
      dispatch(facadeActions.updateNote(note.id, title, text));
    }
  }

  onTitleChange = (e: any) => {
    this.setState({ title: e.target.value });
  };

  onTextChange = (e: any) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { title, text } = this.state;

    return (
      <NoteEditor__>
        <NoteEditor__.Input placeholder='Title' value={title} onChange={this.onTitleChange} autoFocus={!title} />
        <NoteEditor__.Textarea value={text} onChange={this.onTextChange} autoFocus={title} />
      </NoteEditor__>
    );
  }
}
