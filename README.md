# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание базовых классов

**`1. EventEmitter (components/base/events.ts)`**
- __Предназначение:__ Брокер событий для коммуникации между компонентами и моделями.
- **Основные методы:**  
    - **`on<T>(eventName, callback):`** Подписка на событие.  
    - **`emit<T>(eventName, data?):`** Генерация события с данными.
    - **`off(eventName, callback):`** Отписка от события.  

**`2. Component<T> (components/base/Component.ts)`**
- __Предназначение:__ Базовый класс для UI-компонентов, инкапсулирующий работу с DOM.
- __Основные методы:__  
    - **`toggleClass(element, className, force?):`** Переключение CSS-класса.
    - **`setText(element, value):`** Установка текстового содержимого.
    - **`setDisabled(element, state):`** Блокировка/разблокировка элемента.
    - **`render(data?):`** Рендеринг компонента с обновлением данных.

**`3. Model<T> (components/base/Model.ts)`**
- __Предназначение:__ Базовый класс для моделей данных, обеспечивающий обновление состояния и уведомление через события.
- __Основные методы:__
    - **`emitChanges(event, payload?):`** Уведомление об изменении модели.

**`4. Api (components/base/api.ts)`**
- __Предназначение:__ Базовый класс для работы с REST API.
- __Основные методы:__
    - **`get(uri):`** GET-запрос.
    - **`post(uri, data, method):`** POST/PUT/DELETE-запросы.

**`5. AppState (components/AppData.ts)`**
- __Предназначение:__ Управление состоянием приложения (каталог, корзина, заказ).
- __Основные методы:__
    - **`setCatalog(items):`** Установка каталога товаров.
    - **`setPreview(item):`** Установка превью товара.
    - **`addToBasket(item) / removeFromBasket(id):`** Управление корзиной.
    - **`clearBasket() / clearOrder()/ clearAll():`** Очистка состояния.
    - **`getTotalPrice():`** Подсчет общей стоимости.
    - **`getBasketItems():`** Получение количества товаров в корзине.
    - **`selected():`** Заполнение списка товаров в заказе.
    - **`prepareOrder():`** Подготовка данных заказа.
    - **`validateOrder() / validateContact():`** Валидация форм.
    - **`setOrderInput(field, value):`** Обновление полей заказа.

**`6. ProductsApi (components/api/ProductsApi.ts)`**
- __Предназначение:__ Работа с API магазина.
- __Основные методы:__
    - **`getProductsList():`** Получение списка товаров.
    - **`createOrder(order):`** Создание заказа.

**`7. BasketManager (components/BasketManager.ts)`**
- __Предназначение:__ Управление элементами корзины с кэшированием.
- __Основные методы:__
    - **`updateBasket(items):`** Обновление списка товаров в корзине.
    - **`clearCache():`** Очистка кэша и UI корзины.

**`8. App (components/App.ts)`**
- __Предназначение:__ Главный класс приложения, связывающий компоненты, API и состояние.
- __Основные методы:__
    - **`init():`** Инициализация приложения.
    - **`setupEventListeners():`** Настройка обработчиков событий.
    - **`submitOrder():`** Обработка оформления заказа.
    - **`renderModal(content, state?):`** Универсальный рендеринг модальных окон.
    - **`updateFormState(form, errors):`** Обновление состояния форм.

## Описание типов и интерфейсов
**`1. IProduct (types.ts)`**
- __Описание:__ Интерфейс для описания товара.
- __Поля:__
    - **`id: string`** — Уникальный идентификатор.
    - **`description: string`** — Описание.
    - **`image: string`** — Путь к изображению.
    - **`title: string`** — Название.
    - **`category: string`** — Категория.
    - **`price: number | null`** — Цена в "синапсах" (может быть null).
    - **`selected: boolean`** — Флаг выбора товара.

**`2. IUserData (types.ts)`**
- __Описание:__ Интерфейс для данных пользователя при оформлении заказа.
- __Поля:__
   - **`email: string`** — Электронная почта.
   - **`phone: string`** — Номер телефона.
   - **`address: string`** — Адрес доставки.
   - **`payment: string`** — Способ оплаты ("card" или "cash").
   - **`total: number`** — Общая сумма.
   - **`items: string[]`** — Массив ID товаров.

**`3. IAppState (types.ts)`**
- __Описание:__ Интерфейс состояния приложения.
- __Поля:__
   - **`catalog: IProduct[]`** — Список товаров в каталоге.
   - **`basket: IProduct[]`** — Список товаров в корзине.
   - **`preview: IProduct | null`** — Товар для просмотра.
   - **`order: IUserData | null`** — Данные текущего заказа.

**`4. OrderForm (types.ts)`**
- __Описание:__ Тип для формы заказа (подмножество IUserData).
- __Определение:__ **`Omit<IUserData, 'total' | 'items'>`**
- __Поля:__
   - **`email: string`**
   - **`phone: string`**
   - **`address: string`**
   - **`payment: string`**

**`5. FormError (types.ts)`**
- __Описание:__ Тип для ошибок валидации форм.
- __Определение:__ **`Partial<Record<keyof OrderForm, string>>`**

**`6. IEvents (components/base/events.ts)`**
- __Описание:__ Интерфейс для системы событий.
- __Методы:__
   - **`on<T>(event, callback):`** Подписка на событие.
   - **`emit<T>(event, data?):`** Генерация события.

**`7. IModalData (components/common/Modal.ts)`**
- __Описание:__ Интерфейс для данных модального окна.
- __Поля:__
   - **`content: HTMLElement`** — Содержимое модального окна.

**`8. IBasketManager (components/BasketManager.ts)`**
- __Описание:__ Интерфейс для управления корзиной, кэширует элементы корзины и обновляет их вместо пересоздания.
- __Методы:__
   - **`updateBasket(items):`** Обновление корзины.
   - **`clearCache():`** Очистка кэша.

**`9. ApiListResponse<Type> (components/base/api.ts)`**
- __Описание:__ Тип ответа API для списков.
- __Поля:__
   - **`total: number`** — Общее количество элементов.
   - **`items: Type[]`** — Массив элементов.

## Архитектура проекта

Проект использует модульную архитектуру с четким разделением ответственности на три уровня:  

__1. Слой данных `(AppState, Product, ProductsApi):`__
 - Управляет состоянием и взаимодействием с сервером.

__2. Слой отображения `(Component, Card, Basket, Modal, Page, Order, Contacts, Success):`__

- Компоненты для работы с DOM и рендеринга UI.

__3. Слой управления `(App, EventEmitter, BasketManager):`__

- Связывает данные и UI через события и бизнес-логику.

### Поток данных

- Пользователь взаимодействует с UI (например, добавляет товар в корзину).
- Компоненты генерируют события через `EventEmitter.`
- `AppState` обновляет данные и уведомляет об изменениях.
- UI-компоненты реагируют на события и обновляют DOM.

