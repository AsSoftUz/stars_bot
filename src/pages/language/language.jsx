import { useState, useRef, useEffect } from 'react';
import './language.scss';

const languages = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'en', name: 'English', flag: 'en' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const GlobeIcon = () => (
  <svg
    className="language-switcher__globe"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="language-switcher__check"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Language = ({ defaultLanguage = 'en', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const containerRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    if (onChange) {
      onChange(langCode);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="language-switcher" ref={containerRef}>
      <button
        className={`language-switcher__trigger ${isOpen ? 'language-switcher__trigger--active' : ''}`}
        onClick={handleToggle}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
      </button>

      <div className={`language-switcher__dropdown ${isOpen ? 'language-switcher__dropdown--open' : ''}`}>
        <ul className="language-switcher__list" role="listbox">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`language-switcher__item ${selectedLanguage === lang.code ? 'language-switcher__item--selected' : ''}`}
              onClick={() => handleSelect(lang.code)}
              role="option"
              aria-selected={selectedLanguage === lang.code}
            >
              <span className="language-switcher__flag-emoji">{lang.flag}</span>
              <span className="language-switcher__label">{lang.name}</span>
              <CheckIcon />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Language;