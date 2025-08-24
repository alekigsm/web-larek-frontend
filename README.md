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

## Инструкция по сборке и запуску
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

### **Общая архитектура приложения**  

Приложение использует **MVP (Model-View-Presenter)** в сочетании с **событийной моделью (EventEmitter)** для взаимодействия между компонентами. Основные слои:  

-- **Модель (Model)**  
   - Хранит и управляет данными (товары, корзина, заказы, доставка и т. д.).  
   - Не зависит от UI, обеспечивает целостность данных.  

-- **Представление (View)**  
   - Отвечает за отрисовку интерфейса и обработку действий пользователя (клики, ввод и т. п.).  
   - Пассивный слой — только отображает данные и передаёт события Presenter’у.  

-- **EventEmitter (Событийнаый посредник)**  
    Централизованный обработчик событий для слабосвязанной коммуникации между компонентами.

Типы
EventName = string | RegExp - имя/шаблон события

Subscriber = Function - функция-обработчик

EmitterEvent = {eventName: string, data: unknown} - данные события

Интерфейс IEvents
on(event, callback) - подписка на событие

emit(event, data?) - генерация события

trigger(event, context?) - создание функции-триггера

Класс EventEmitter
Конструктор
constructor() - создает экземпляр с пустой картой событий

Методы
on(eventName, callback) - регистрация обработчика

off(eventName, callback) - удаление обработчика

emit(eventName, data?) - отправка события всем подписчикам

onAll(callback) - подписка на все события

offAll() - очистка всех подписок

trigger(eventName, context?) - создание функции, генерирующей событие

Внутреннее свойство
_events: Map<EventName, Set<Subscriber>> - хранилище подписок

-- **API-слой**  
-- **Класс API**
Основной класс для HTTP-запросов к серверу.

Конструктор
constructor(baseUrl: string, options: RequestInit = {})

baseUrl - базовый URL API

options - опции запросов (опционально)

Методы
get(uri) - GET запрос

post(uri, data, method?) - POST/PUT/DELETE запрос

Типы
ApiListResponse<Type> - ответ с списком данных

ApiPostMethods - методы: 'POST' | 'PUT' | 'DELETE'

-- **Класс LarekApi** 
Расширяет базовый Api для работы с товарами и заказами.

Конструктор
constructor(cdn: string, baseUrl: string, options?: RequestInit)

cdn - базовый URL для изображений

baseUrl - базовый URL API

options - опции запросов

Методы
getProductList() - получает список товаров и преобразует пути изображений

orderProducts(order) - отправляет заказ на сервер

-- **Слой модели данных**
Класс Catalog
Управляет списком товаров и выбором товаров.

Конструктор
constructor(events: IEvents) - принимает экземпляр EventEmitter

Методы
setProducts(products) - сохраняет список товаров и отправляет событие

getProducts() - возвращает список товаров

setSelectedProduct(product) - выбирает товар и отправляет событие

getSelectedProduct() - возвращает выбранный товар

getProduct(id) - находит товар по ID

События
catalog:changed - при обновлении списка товаров

product:selected - при выборе товара

Класс ModelBasket
Управляет корзиной товаров.

Конструктор
constructor(events: IEvents) - принимает EventEmitter

Методы
addProduct(item) - добавляет товар в корзину

delProduct(id) - удаляет товар по ID

clearBasket() - очищает корзину

getCountProduct() - возвращает количество товаров

getListedProduct() - возвращает список товаров

getTotalPrice() - возвращает общую сумму

hasProduct(item) - проверяет наличие товара

События
basket:changed - при любом изменении корзины

  Класс Buyer
Управляет данными покупателя и валидацией.

Конструктор
constructor(events: IEvents) - принимает EventEmitter

Методы
setPerson(data) - обновляет данные покупателя

setOrderField(field, value) - изменяет конкретное поле

getSavePersonInfo() - возвращает все данные

getAddress(), getEmail(), getPhone(), getPayment() - возвращают конкретные поля

validatePayment(), validateAddress(), validateEmail(), validatePhone() - проверяют заполненность полей

События
person:changed - при изменении данных

buyer:changed - при изменении конкретного поля
-- **Слой представления**
    Класс Component<T>
Абстрактный базовый компонент для всех представлений.

Конструктор
constructor(container: HTMLElement) - принимает DOM-контейнер

Свойства
protected container: HTMLElement - корневой элемент компонента

Методы
toggleClass(element: HTMLElement, className: string, force?: boolean) - переключает класс

setText(element: HTMLElement, value: unknown) - устанавливает текст

setDisabled(element: HTMLElement, state: boolean) - блокирует/разблокирует элемент

setHidden(element: HTMLElement) - скрывает элемент

setVisible(element: HTMLElement) - показывает элемент

setImage(element: HTMLImageElement, src: string, alt?: string) - устанавливает изображение

render(data?: Partial<T>): HTMLElement - отрисовывает компонент с данными

Класс Form<T>
Универсальный компонент для управления HTML-формами с валидацией.

Конструктор
constructor(container: HTMLFormElement, events: IEvents) - принимает форму и EventEmitter

Свойства
protected _submit: HTMLButtonElement - кнопка отправки

protected _errors: HTMLElement - блок ошибок

Методы
render(state?: Partial<T> & IFormState): HTMLFormElement - отрисовывает форму с данными и состоянием

Сеттеры
set valid(value: boolean) - блокирует/разблокирует кнопку отправки

set errors(value: string) - устанавливает текст ошибок

События
form:change - при изменении поля ввода

[formName]:submit - при отправке формы
Класс Modal
Компонент модального окна для отображения контента.

Конструктор
constructor(container: HTMLElement, events: IEvents) - принимает контейнер и EventEmitter

Свойства
protected _closeButton: HTMLButtonElement - кнопка закрытия

protected _content: HTMLElement - контейнер контента

Методы
open() - открывает модальное окно

close() - закрывает модальное окно

render(data: IModalData): HTMLElement - отрисовывает и открывает окно

Сеттеры
set content(value: HTMLElement) - устанавливает содержимое

События
modal:open - при открытии

modal:close - при закрытии
    
Класс Contacts
Форма для ввода контактных данных (email и телефон).

Конструктор
constructor(container: HTMLFormElement, events: IEvents) - наследует от Form<IShipping>

Сеттеры
set phone(value: string) - устанавливает значение телефона

set email(value: string) - устанавливает значение email

Класс Basket
Компонент для отображения корзины товаров.

Конструктор
constructor(container: HTMLElement, actions: Actions) - принимает контейнер и действия

Свойства
protected _list: HTMLElement - список товаров

protected _totalPrice: HTMLElement - общая сумма

protected _button: HTMLButtonElement - кнопка оформления

Сеттеры
set items(items: HTMLElement[]) - устанавливает список товаров

set selected(items: string[]) - блокирует кнопку при пустой корзине

set total(total: number) - устанавливает общую сумму

Классы Card, CardCatalog, CardPreview
Базовый класс и наследники для карточек товаров.

Card (базовый класс)
Свойства:

_cardPrice, _cardImg, _cardTitle, _cardCategory - элементы карточки

Сеттеры:

price - устанавливает цену ("Бесценно" если null)

title - устанавливает заголовок

category - устанавливает категорию и добавляет CSS-класс

image - устанавливает изображение

CardCatalog
Карточка товара в каталоге.

Конструктор: constructor(container: HTMLElement, actions: Actions)

Добавляет обработчик клика на всю карточку

CardPreview
Карточка товара в превью.

Свойства:

_cardText, _cardButton - дополнительные элементы

Конструктор: constructor(container: HTMLElement, actions: Actions)

Добавляет обработчик клика на кнопку

Сеттеры:

description - устанавливает описание

price - устанавливает цену и блокирует кнопку если "Бесценно"

buttonText - устанавливает текст кнопки

Класс CardBasket
Карточка товара в корзине с возможностью удаления.

Конструктор
constructor(container: HTMLElement, actions: Actions) - принимает контейнер и действия

Свойства
_basketItem: HTMLElement - элемент счетчика

_price: HTMLElement - элемент цены

_Title: HTMLElement - элемент названия

_itemDeleteButton: HTMLButtonElement - кнопка удаления

Сеттеры
price - устанавливает цену товара

title - устанавливает название товара

counter - устанавливает номер позиции в корзине

Класс Order
Форма оформления заказа с выбором способа оплаты.

Конструктор
constructor(container: HTMLFormElement, events: IEvents) - наследует от Form<IShipping>

Свойства
paymentCardButton: HTMLButtonElement - кнопка оплаты картой

paymentCashButton: HTMLButtonElement - кнопка оплаты наличными

Сеттеры
address - устанавливает адрес доставки

payment - активирует выбранный способ оплаты

Особенности
Обрабатывает клики по кнопкам оплаты через onInputChange

Класс Success
Компонент успешного оформления заказа.

Конструктор
constructor(container: HTMLElement, actions: Actions) - принимает контейнер и действия

Свойства
totalElement: HTMLElement - элемент для отображения суммы

closeButton: HTMLButtonElement - кнопка закрытия

Сеттеры
total - устанавливает итоговую сумму списания

Класс Page
Основной компонент страницы приложения.

Конструктор
constructor(container: HTMLElement, events: IEvents) - принимает контейнер и EventEmitter

Свойства
_counter: HTMLElement - счетчик товаров в корзине

_catalog: HTMLElement - контейнер каталога товаров

_wrapper: HTMLElement - основной wrapper страницы

_basket: HTMLElement - кнопка корзины

Сеттеры
counter - устанавливает количество товаров в корзине

catalog - отображает список карточек товаров

locked - блокирует/разблокирует страницу

События
basket:open - при клике на корзину




Класс Catalog
Каталог товаров с методами управления списком продуктов и выбранным товаром.

Конструктор
constructor(events: IEvents) - принимает EventEmitter

Свойства
products: IItem[] - список товаров

selectedProduct: IItem - выбранный товар

Методы
setProducts(products: IItem[]) - устанавливает список товаров

getProducts(): IItem[] - возвращает список товаров

setSelectedProduct(product: IItem) - выбирает товар

getSelectedProduct(): IItem - возвращает выбранный товар

getProduct(id: string): IItem - находит товар по ID

События
catalog:changed - при изменении списка товаров

product:selected - при выборе товара