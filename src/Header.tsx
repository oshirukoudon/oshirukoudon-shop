// Header.tsx
import React, { useState } from "react";

interface HeaderProps {
  onMenuClick: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  const closeMenu = (section: string) => {
    setMenuVisible(false);
    onMenuClick(section);
  };

  return (
    <header>
      <h1>おしるこうどん屋</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="material-icons">menu</i>
      </div>
      <nav className={`nav ${menuVisible ? 'visible' : ''}`}>
        <a href="#" onClick={() => closeMenu('top')}>ホーム</a>
        <a href="#" onClick={() => closeMenu('menu')}>メニュー</a>
        <a href="#" onClick={() => closeMenu('form')}>お問い合わせ</a>
      </nav>
      {menuVisible && (
        <div className="menu-popup">
          <a href="#" onClick={() => closeMenu('top')}>ホーム</a>
          <a href="#" onClick={() => closeMenu('menu')}>メニュー</a>
          <a href="#" onClick={() => closeMenu('form')}>お問い合わせ</a>
        </div>
      )}
    </header>
  );
};

export default Header;
