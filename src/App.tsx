import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import topImages from "./TopImages";
import items from "./items";

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [selectedType, setSelectedType] = useState<string>('all');
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (topImages.length + 1));
      setIsTransitioning(true);
    }, 3000); // 3秒ごとに画像を切り替え

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentIndex === topImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000); // アニメーションの時間に合わせて設定
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (slideRef.current) {
        slideRef.current.style.width = `${100 * (topImages.length + 1)}%`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初回レンダリング時に幅を設定

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slideStyle: React.CSSProperties = {
    transform: `translateX(-${currentIndex * (100 / (topImages.length + 1))}%)`,
    transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',
    width: `${100 * (topImages.length + 1)}%`
  };

  const handleMenuClick = (section: string) => {
    setActiveSection(section);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const filteredItems = selectedType === 'all' ? items : items.filter(item => item.type === selectedType);

  return (
    <div className="App">
      <Header onMenuClick={handleMenuClick} />

      <div className="top" style={{ display: activeSection === 'top' ? 'block' : 'none' }}>
        <div className="slideshow">
          <div className="slide" style={slideStyle} ref={slideRef}>
            {topImages.concat(topImages[0]).map((src: string, index: number) => (
              <img key={index} src={src} alt={`うどん${index + 1}`} />
            ))}
          </div>
        </div>
        
        <div className="description">
          <h2>おしるこうどん屋について</h2>
          <p>おしるこうどん屋ではVRChat向けのアバター用衣装の制作、販売を行っています。</p>
          <a href="https://oshirukoudon.booth.pm/" target="_blank" rel="noopener noreferrer">BOOTHのショップへ移動</a>
        </div>

        <div>
          <div className="new-items">
            <h2>新着商品</h2>
          </div>

          <div className="container">
            <a href={items[91].link} target="_blank" rel="noopener noreferrer">
              <div className="box">
                <img src="img/items/092.png" width="300px" height="300px" alt="最新衣装" />
                <h2>【無料】ティコ・ポプリ用 和装バニー</h2>
                <p>和装とバニーを組み合わせた奇妙な衣装です。</p>
              </div>
            </a>
            <a href={items[88].link} target="_blank" rel="noopener noreferrer">
              <div className="box">
                <img src="img/items/089.png" width="300px" height="300px" alt="最新衣装" />
                <h2>【無料】ティコ・ポプリ用 浴衣2024</h2>
                <p>ティコちゃんポプリちゃん用の浴衣です。</p>
              </div>
            </a>
            <a href={items[85].link} target="_blank" rel="noopener noreferrer">
              <div className="box">
                <img src="img/items/086.png" width="300px" height="300px" alt="最新衣装" />
                <h2>【無料】ティコ・ポプリ用 ミニパレオ付水着</h2>
                <p>ミニパレオ付きの水着衣装です。</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="menu-list" style={{ display: activeSection === 'menu' ? 'block' : 'none' }}>

        <div className="description">
          <h2>商品一覧</h2>
          <p>クリックするとBOOTHの商品ページを開きます</p>
        </div>

        <div className="menu-top">
          <select onChange={handleTypeChange} value={selectedType} className="menu-combo">
            <option value="all">All</option>
            <option value="tycho">ティコ</option>
            <option value="marimo">まりも</option>
            <option value="kaya">伊奈波かや</option>
            <option value="raine">御咲ライネ</option>
            <option value="amary">アメリー</option>
            <option value="items">アイテム</option>
            <option value="mame">まめふれんず</option>
            <option value="multi">複数</option>
          </select>
        </div>
        <main className="menu-page">

          <div className="thumbnail-container">
            {filteredItems.slice().reverse().map((item, index) => (
              <div key={index} className="thumbnail-box">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img src={item.src} alt={`サムネイル${filteredItems.length - index}`} />
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="form" style={{ display: activeSection === 'form' ? 'block' : 'none' }}>
        <div className="form-style">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfCQWeuc7pFd5slbkH3O7mj6yYb6UsIxSFOs2qMUF4HK_zH0A/viewform?embedded=true" 
            width="640" 
            height="452"
            frameBorder={0}
            marginHeight={0} 
            marginWidth={0}
            title="お問い合わせフォーム"
          >読み込んでいます…
          </iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
