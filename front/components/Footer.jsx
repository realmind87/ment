import { useState } from 'react';
import SearchForm from './SearchForm';
import ToolList from './ToolList';

const Footer = () => {
  const [active, setActive] = useState(null);
  
  return (
    <footer className="footer">
      {active !== 'search' ? (
        <ToolList set={setActive} />
      ) : (
        <SearchForm set={setActive} />
      )}
    </footer>
  );
};

export default Footer;
