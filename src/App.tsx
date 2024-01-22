import { FC } from 'react';
import FileUpload from './components/FileUpload';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>iCalendar to JSON Converter</h1>
      <FileUpload />
    </div>
  );
};
