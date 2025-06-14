// Sidebar.js
import pkg from 'react-burger-menu';
import Navitems from './Navitems';

const { slide: Menu } = pkg;
import '../app/routes/admin/Sidebar.css'; // For default styles from the library

export default function Sidebar() {
  return (
    <Menu>
     <Navitems />
    </Menu>
  );
}
