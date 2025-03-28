import { ProductsApi } from './components/api/ProductsApi';
import { AppState } from './components/AppData';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL, TEMPLATES } from './utils/constants';
import { App } from './components/App';
import { Basket } from './components/Basket';
import { BasketManager } from './components/BasketManager';
import { Modal } from './components/common/Modal';
import { Success } from './components/common/Success';
import { Contacts } from './components/Contacts';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';


// Экземпляр брокера событий
const events = new EventEmitter();

// Инициализация API для работы с сервером
const api = new ProductsApi(CDN_URL, API_URL);

// Создание состояние приложения для хранения данных
const appData = new AppState({}, events);

// Создание экземпляров компонентов
const page = new Page(document.body, events);
const modal = new Modal(ensureElement('#modal-container'), events);
const basket = new Basket('basket', cloneTemplate(TEMPLATES.BASKET_TEMPLATE), events);
const order = new Order(cloneTemplate(TEMPLATES.ORDER_TEMPLATE), events);
const contacts = new Contacts(cloneTemplate(TEMPLATES.CONTACTS_TEMPLATE), events);
const success = new Success(cloneTemplate(TEMPLATES.SUCCESS_TEMPLATE), events);
const basketManager = new BasketManager(basket, events);

// Инициализация главного класса приложения
const app = new App(events, api, appData, page, modal, basket, order, contacts, success, basketManager);

// Запуск приложения
app.init();

