/* eslint-disable react/prop-types */
import { useEffect, useState, createContext, useContext } from 'react';

export const defaultLanguageValue = {
  currentLanguage: 'english',
  setCurrentLanguage: () => {},
  translations: {
    english: {
      title: 'WHO WILL BE THE NEXT LEADER?',
      subtitle: 'CHOOSE YOUR CANDIDATE',
      candidates: [
        {
          name: 'RIDWAN KAMIL',
          slogan: 'Shaping Our Future Together: Building a Stronger, Brighter Tomorrow',
          votes: 'Total Vote',
        },
        {
          name: 'DHARMA PONGREKUN',
          slogan: 'Honesty and Integrity: The Foundation for Shared Progress',
          votes: 'Total Vote',
        },
        {
          name: 'PRAMONO ANUNG',
          slogan: 'Genuine Change for the Well-being of All',
          votes: 'Total Vote',
        },
      ],
      totalVote: 'Total Vote',
      voteButton: 'Vote',
    },
    indonesian: {
      title: 'SIAPA YANG AKAN MENJADI PEMIMPIN BERIKUTNYA?',
      subtitle: 'PILIH KANDIDATMU',
      candidates: [
        {
          name: 'RIDWAN KAMIL',
          slogan: 'Membangun bersama untuk masa depan yang cerah',
          votes: 'Jumlah Suara',
        },
        {
          name: 'DHARMA PONGREKUN',
          slogan: 'Kejujuran dan integritas untuk kemajuan bersama',
          votes: 'Jumlah Suara',
        },
        {
          name: 'PRAMONO ANUNG',
          slogan: 'Perubahan nyata untuk kesejahteraan rakyat',
          votes: 'Jumlah Suara',
        },
      ],
      totalVote: 'Jumlah Suara',
      voteButton: 'Pilih',
    },
  },
};

export const LanguageContext = createContext(defaultLanguageValue);
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('english');

  function updateLanguageInLocalStorage(language) {
    localStorage.setItem('language', language);
  }

  useEffect(() => {
    const persistentLanguage = localStorage.getItem('language');
    if (persistentLanguage) {
      setCurrentLanguage(persistentLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage: (language) => {
          updateLanguageInLocalStorage(language);
          setCurrentLanguage(language);
        },
        translations: defaultLanguageValue.translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
