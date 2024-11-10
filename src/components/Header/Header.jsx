import SelectUser from '../SelectUser/SelectUser';
import './Header.scss';

function Header() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <header className="header">
      <SelectUser />
      <svg width="180" height="26" viewBox="0 0 180 26">
        <use href={`${baseUrl ? baseUrl + '/' : ''}sprite.svg#logo-svg}`}></use>
      </svg>
    </header>
  );
}

export default Header;
