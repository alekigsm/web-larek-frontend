import { EventEmitter } from './components/base/events';
import { Buyer } from './components/Buyer';
import { Catalog } from './components/Catalog';
import { LarekApi } from './components/LarekApi';
import { ModelBasket } from './components/ModelBasket';
import { Basket } from './components/View/Basket';
import { Form } from './components/common/Form';
import { Success } from './components/View/Success';
import './scss/styles.scss';
import { IOrder, IShipping } from './types';
import { API_URL, CDN_URL, serverData } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { CardBasket } from './components/View/CardBasket';
import { Contacts } from './components/View/Сontacts';
import { Order } from './components/View/Order';
import { Modal } from './components/common/Modal';
import { Page } from './components/View/Page';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})

// поиск шаблонов
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

//модели данных
const catalog = new Catalog(events);
const basket = new ModelBasket(events);
const buyer = new Buyer(events);

// компоненты представления
const order = new Order(cloneTemplate(orderTemplate), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const page = new Page(ensureElement<HTMLElement>('.page'), events);

const actions = {
	onClick: () => {
		modal.close();
	}
}
const success = new Success(cloneTemplate(successTemplate), actions);
modal.render({ content: success.render() })





api.getProductList()
	.then((items) => {
		catalog.setProducts(items)
	})
	.catch((error) => { console.log(error) })

events.on('catalog:changed', () => {
	const cardArray = catalog.getProducts().map((item) => {
		const actions = {
			onClick: () => {
				catalog.setSelectedProduct(item);
			}
		}
		const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), actions);
		const cardElement = card.render(item)
		return cardElement
	});
	page.render({ catalog: cardArray })
});



events.on('product:selected', () => {
	const actions = {
		onClick: () => {
			console.log('в коризну')
		},
	};
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), actions);
	const cardElement = card.render(catalog.getSelectedProduct())
	modal.render({ content: cardElement })
});




events.on(`modal:open`, () => {
	page.render({ locked: true })
})


events.on(`modal:close`, () => {
	page.render({ locked: false })
})