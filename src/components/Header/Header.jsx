import SelectUser from '../SelectUser/SelectUser';
import './Header.scss';

function Header() {

  return (
    <header className="header">
      <SelectUser />
      <svg width="180" height="26" viewBox="0 0 180 26">
        <use href="/sprite.svg#logo-svg"></use>
      </svg>
    </header>
  );
}

export default Header;
