import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Инициализация с ленивой загрузкой данных из localStorage
  const [data, setData] = useState(() => {
    const initial = initialValue ? initialValue : [];
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initial; // Если данных нет, возвращаем пустой массив
  });

  useEffect(() => {
    // Если в данных еще нет, создаем их в localStorage
    if (data && data.length === 0) {
      const initial = initialValue ? initialValue : [];
      localStorage.setItem(key, JSON.stringify(initial));
    } else {
      // Если данные изменяются, записываем их в localStorage
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]); // Срабатывает только при изменении данных

  const saveData = (newData) => {
    // Проверка на изменения: записывать только если данные изменились
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      setData(newData); // Обновляем состояние
    }
  };

  return [data, saveData];
}

export default useLocalStorage;

//import { useState, useEffect } from 'react';

//export function useLocalStorage(key) {
//  //const [data, setData] = useState(() => {
//  //  // При инициализации пытаемся получить данные из localStorage
//  //  const savedData = localStorage.getItem(key);
//  //  return savedData ? JSON.parse(savedData) : []; // Если нет данных, возвращаем пустой массив
//  //});

//  const [data, setData] = useState();

//  useEffect(() => {
//    const res = JSON.parse(localStorage.getItem(key));
//    if (res) {
//      setData(res);
//    } else {
//      localStorage.setItem(key, JSON.stringify([]));
//    }
//  }, [key]);

//  const saveData = (newData) => {
//    if (newData) {
//      localStorage.setItem(key, JSON.stringify(newData));
//      setData(newData);
//    }
//  };

//  return [data, saveData];
//}

//export default useLocalStorage;
