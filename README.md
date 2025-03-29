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

**`2. IOrder (types.ts)`**
- __Описание:__ Интерфейс для данных пользователя при оформлении заказа.
- __Поля:__
   - **`email: string`** — Электронная почта.
   - **`phone: string`** — Номер телефона.
   - **`address: string`** — Адрес доставки.
   - **`payment: string`** — Способ оплаты ("card" или "cash").
   - **`total: number`** — Общая сумма.
   - **`items: string[]`** — Массив ID товаров.

**`3. IAppState (types.ts)`**
- __Описание:__ Интерфейс состояния приложения с методами работы с данными.
- __Поля:__
   - **`catalog: IProduct[]`** — Список товаров в каталоге.
   - **`basket: IProduct[]`** — Список товаров в корзине.
   - **`preview: IProduct | null`** — Товар для просмотра.
   - **`order: IOrder | null`** — Данные текущего заказа.
- Методы работы с данными (реализованы в классе **`AppState`**):

   - **`setCatalog(items: IProduct[]): void`** — Установка каталога товаров.
   - **`setPreview(item: IProduct): void`** — Установка товара для превью.
   - **`addToBasket(item: IProduct): void`** — Добавление товара в корзину.
   - **`removeFromBasket(id: string): void`** — Удаление товара из корзины.
   - **`clearBasket(): void`** — Очистка корзины.
   - **`clearOrder(): void`** — Очистка данных заказа.
   - **`clearAll(): void`** — Полная очистка состояния.
   - **`getTotalPrice(): number`** — Подсчёт общей стоимости.
   - **`getBasketItems(): number`** — Получение количества товаров в корзине.
   - **`selected(): void`** — Заполнение списка ID товаров в заказе.
   - **`prepareOrder(): IOrder`** — Подготовка данных заказа.
   - **`validateOrder(): boolean`** — Валидация формы заказа.
   - **`validateContact(): boolean`** — Валидация формы контактов.
   - **`setOrderInput(field: keyof OrderForm, value: string): void`** — Обновление полей заказа.

**`4. OrderForm (types.ts)`**
- __Описание:__ Тип для формы заказа (подмножество IOrder).
- __Определение:__ **`Omit<IOrder, 'total' | 'items'>`**
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

### 1. Слой данных (Model)
- **Описание:** Управляет состоянием приложения и взаимодействием с сервером через API.
- **Компоненты:**  
**`AppState (components/AppData.ts)`**  
- **Предназначение:** Хранит и управляет глобальным состоянием приложения (каталог, корзина, заказ, ошибки).  
**Основные методы:**  
    - **`setCatalog(items: IProduct[]): void`** — Установка каталога товаров.
    - **`setPreview(item: IProduct): void`** — Установка товара для превью.
    - **`addToBasket(item: IProduct): void / removeFromBasket(id: string): void`** — Управление корзиной.
    - **`clearBasket(): void / clearOrder(): void / clearAll(): void`** — Очистка состояния.
    - **`getTotalPrice(): number`** — Подсчёт общей стоимости.
    - **`getBasketItems(): number`** — Получение количества товаров в корзине.
    - **`selected(): void`** — Заполнение списка ID товаров в заказе.
    - **`prepareOrder(): IOrder`** — Подготовка данных заказа.
    - **`validateOrder(): boolean / validateContact(): boolean`** — Валидация форм.
    - **`setOrderInput(field: keyof OrderForm, value: string): void`** — Обновление полей заказа.

- **`ProductsApi (components/api/ProductsApi.ts)`**
- **Предназначение:** Расширение `Api` для работы с API магазина.
**Основные методы:**
    - **`getProductsList(): Promise<IProduct[]>`** — Получение списка товаров с добавлением CDN к изображениям.
    - **`createOrder(order: IOrder): Promise<OrderSuccess>`** — Создание заказа на сервере.

### 2. Слой отображения (View)

**Описание:** Компоненты для работы с DOM и рендеринга пользовательского интерфейса.  
**Компоненты:**  

**`Card (components/Card.ts)`**  
- **`Предназначение:`** Отображение карточки товара (в каталоге или превью).  
**`Основные методы:`**

    - **`set id(value: string): void / get id(): string`** — Установка/получение ID.
    - **`set title(value: string): void / get title(): string`** — Установка/получение названия.
    - **`set description(value: string): void`** — Установка описания.
    - **`set image(value: string): void`** — Установка изображения.
    - **`set price(value: number | null): void`** — Установка цены (блокирует кнопку для null).
    - **`set category(value: string): void / get category(): string`** — Установка/получение категории с цветом.
    - **`set buttonText(value: string): void`** — Установка текста кнопки.

**`Basket (components/Basket.ts)`**  

- **Предназначение:** Отображение корзины с товарами и общей суммой.
- **Основные методы:**  
   - **`set items(items: HTMLElement[]): void`** — Установка списка товаров в корзине.
    - **`set total(total: number): void`** — Установка общей суммы.
    - **`disableButton(): void`** — Отключение кнопки "Оформить".

**`BasketItem (components/Basket.ts)`**

- **Предназначение:** Отображение отдельного элемента в корзине.  
- **Основные методы:**  
    - **`set index(value: number): void`** — Установка порядкового номера.
    - **`set price(value: number): void`** — Установка цены.
    - **`set title(value: string): void`** — Установка названия.

**`Modal (components/common/Modal.ts)`**

- **`Предназначение:`** Универсальное модальное окно для отображения контента.  
**`Основные методы:`**

   - **`set content(value: HTMLElement): void`** — Установка содержимого.
   - **`open(): void`** — Открытие модального окна.
   - **`close(): void`** — Закрытие модального окна.
   - **`render(data: IModalData): HTMLElement`** — Рендеринг с открытием.

**`Page (components/Page.ts)`**

- **`Предназначение:`** Главная страница с каталогом и кнопкой корзины.  
- **`Основные методы:`**  

   - **`set catalog(items: HTMLElement[]): void`** — Установка карточек в галерее.
   - **`set counter(value: number): void`** — Установка счётчика товаров в корзине.
   - **`set locked(value: boolean): void`** — Блокировка/разблокировка прокрутки.
   - **`saveScrollPosition(): void / restoreScrollPosition(): void`** — правление позицией прокрутки.

 **`Order (components/Order.ts)`**

- **`Предназначение:`** Форма выбора способа оплаты и ввода адреса.
- **`Основные методы:`**

    - **`togglePayment(payment: string): void`** — Переключение способа оплаты.  
    - **`resetForm(): void`** — Сброс формы с генерацией события `order:reset`.

**`Contacts (components/Contacts.ts)`**

- **`Предназначение:`** Форма ввода email и телефона.  
- **`Основные методы:`**

    - **`set email(value: string): void`** — Установка email.
    - **`set phone(value: string): void`** — Установка телефона.
    - **`clear(): void`** — Очистка полей.
    - **`resetForm(): void`** — Сброс формы с генерацией события `contacts:reset`.

**`Success (components/common/Success.ts)`**

- **`Предназначение:`** Уведомление об успешном заказе.  
- **`Основные методы:`**

    - **`set total(value: number): void`** — Установка суммы списания.

**`Form<T> (components/common/Form.ts)`**

- **`Предназначение:`** Базовый класс для форм с поддержкой валидации и событий.  
- **`Основные методы:`**

    - **`set valid(value: boolean): void`** — Установка состояния валидности.
    - **`set errors(value: string): void`** — Установка текста ошибок.
    - **`render(state?: Partial<T> & IFormState): HTMLElement`** — Рендеринг формы.
    - **`resetForm(): void`** — Сброс формы с генерацией события `{formName}:reset.`

### 3. Слой управления (Presenter)

- **`Описание:`** Связывает данные и UI через события и бизнес-логику, обеспечивая слабое связывание.  
- **`Компоненты:`**

**`App (components/App.ts)`**

- **Предназначение:** Главный класс приложения, координирующий работу компонентов, API и состояния через внедрение зависимостей.  
- **Основные методы:**

    - **`init(): void`** — Инициализация приложения с загрузкой каталога.
    - **`setupEventListeners(): void`** — Настройка обработчиков событий.
    - **`submitOrder(): Promise<void>`** — Асинхронная отправка заказа.
    - **`renderModal(content: { render: (data?: any) => HTMLElement }, state?: any): void`** — Рендеринг модальных окон.
    - **`updateFormState(form: Order | Contacts, errors: Partial<OrderForm>): void`** — Обновление состояния форм.

**`BasketManager (components/BasketManager.ts)`**

- **`Предназначение:`** Управление элементами корзины с кэшированием для оптимизации рендеринга.  
**`Основные методы:`**

   - **`updateBasket(items: IProduct[]): void`** — Обновление UI корзины.
   - **`clearCache(): void`** — Очистка кэша и UI корзины.

**`Список событий в приложении (utils/constants.ts - EVENT_TYPES)`**

- **`catalog:change`** — Изменение каталога товаров.
- **`card:select`** — Выбор карточки для превью.
- **`card:add`** — Добавление товара в корзину.
- **`basket:remove`** — Удаление товара из корзины.
- **`basket:open`** — Открытие корзины.
- **`basket:change`** — Изменение содержимого корзины.
- **`order:open`** — Открытие формы заказа.
- **`order:submit`** — Отправка формы заказа.
- **`contacts:submit`** — Отправка формы контактов.
- **`order:errors:change`** — Изменение ошибок формы заказа.
- **`contacts:errors:change`** — Изменение ошибок формы контактов.
- **`form:input:change`** — Изменение ввода в форме.
- **`modal:open`** — Открытие модального окна.
- **`modal:close`** — Закрытие модального окна.
- **`order:reset`** — Сброс формы заказа.
- **`contacts:reset`** — Сброс формы контактов.

### Константы (utils/constants.ts)

- **`EVENT_TYPES:`** Названия событий приложения.
- **`TEMPLATES:`** Идентификаторы HTML-шаблонов.
- **`ERROR_MESSAGES:`** Тексты ошибок валидации и API.
- **`CATEGORY_COLOR_MAP:`** Маппинг категорий на CSS-классы цветов.

### Поток данных

- Пользователь взаимодействует с UI (например, добавляет товар в корзину).
- Компоненты генерируют события через `EventEmitter.`
- `AppState` обновляет данные и уведомляет об изменениях.
- UI-компоненты реагируют на события и обновляют DOM.

[ссылка на "Веб-ларек"](https://github.com/Ddenzl/web-larek-frontend.git)