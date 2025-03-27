import { ProductsApi } from './components/api/ProductsApi';
import { AppState } from './components/AppData';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { App } from './components/App';


// Экземпляр брокера событий
const events = new EventEmitter();

// Инициализация API для работы с сервером
const api = new ProductsApi(CDN_URL, API_URL);

// Создание состояние приложения для хранения данных
const appData = new AppState({}, events);

// Инициализация главного класса приложения
const app = new App(events, api, appData);

// Запуск приложения
app.init();
