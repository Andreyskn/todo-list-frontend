declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'Icons' {
  const EditIcon: any;
  const AddIcon: any;
  const SaveIcon: any;
  const CrossIcon: any;
  export { EditIcon, AddIcon, SaveIcon, CrossIcon };
}
