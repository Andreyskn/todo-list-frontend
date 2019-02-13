declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'Icons' {
  const Edit: any;
  const Add: any;
  const Save: any;
  const Cross: any;
  const Settings: any;
  const Error: any;
  const Success: any;
  export { Edit, Add, Save, Cross, Settings, Error, Success };
}
