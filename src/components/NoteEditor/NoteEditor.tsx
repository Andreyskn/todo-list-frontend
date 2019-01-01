import React from 'react';

import { facadeActions } from '../../store/actions';

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
    const { note } = this.props;
    const { title, text } = this.state;

    return (
      <div>
        <div>{note.title}</div>
        <input value={title} onChange={this.onTitleChange} autoFocus={true} />
        <br />
        <div>{note.text}</div>
        <textarea value={text} onChange={this.onTextChange} />
      </div>
    );
  }
}
