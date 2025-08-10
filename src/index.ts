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

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})

const actions = {
	onClick: () => {
		console.log('click');
	}
}

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const order = new Order(cloneTemplate(orderTemplate), events);

const modal = new Modal(ensureElement<HTMLElement>('#modal__container'), events);

events.on('order:open', () => {
	modal.render({
		content: order.render({
			phone: '',
			email: '',
			valid: false,
			errors: []
		})
	});
});

const catalog = new Catalog();
catalog.setProducts(serverData.items);

///корзина
const bas = new ModelBasket();
bas.addProduct(serverData.items[1]);
console.log('кол-во в корзине', bas.getCountProduct());


//покупатель
const testData: IShipping = {
	payment: 'card',
	address: 'ул. Пушкина, д. 10',
	email: 'ivan@mail.com',
	phone: '+79123456789',
};
const pers = new Buyer();
pers.setPerson(testData);

const orders: IOrder = {
	payment: 'card',
	address: 'ул. Пушкина, д. 10',
	email: 'ivan@mail.com',
	phone: '+79123456789',
	total: 2200,
	items: [
		"854cef69-976d-4c2a-a18c-2aa45046c390",
		"c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
	]
}


//view

/*
const successContainer = cloneTemplate('#success')
const success = new Success(successContainer, actions)

const gallery = document.querySelector('.gallery') as HTMLElement;
gallery.appendChild(success.render());


weblarek.getProductList()
	.then(products => {

		catalog.setProducts(products)
		success.render({ total: 25200 })
	})
	.catch(err => {
		console.error(err);
	}); */



/*
const basketContainer = cloneTemplate('#basket')
const basket = new Basket(basketContainer, actions)

const gallery1 = document.querySelector('.gallery') as HTMLElement;
gallery1.appendChild(basket.render({ total: 0 }));


weblarek.getProductList()
	.then(products => {

		catalog.setProducts(products)

		basket.render({ total: 3400 })
	})
	.catch(err => {
		console.error(err);
	}); */



/* const gallery2 = document.querySelector('.gallery') as HTMLElement;
const cardContainer = cloneTemplate('#card-catalog');
const card = new CardCatalog(cardContainer, actions);
gallery2.appendChild(card.render({ price: 5555555 }));

 */

/* const gallery3 = document.querySelector('.gallery') as HTMLElement;
const cardContainer2 = cloneTemplate('#card-preview');
const card2 = new CardPreview(cardContainer2, actions);
gallery3.appendChild(card2.render());

weblarek.getProductList()
	.then(products => {

		catalog.setProducts(products)

		card2.render({
			image: 'https://yandex.ru/images/search?uinfo=&text=%D0%92%D0%BE%D0%B4%D0%BE%D0%BF%D0%B0%D0%B4&nl=1&source=morda',
			price: 8500, category: "тнкс", title: "новый титл", description: "большйо текст"
		})
	})
	.catch(err => {
		console.error(err);
	}); */

/* const gallery4 = document.querySelector('.gallery') as HTMLElement;
const cardContainerBasket = cloneTemplate('#card-basket');
const card4 = new CardBasket(cardContainerBasket, actions);
gallery4.appendChild(card4.render({ price: 442, title: 'rerb', id: "2" }));
weblarek.getProductList()
	.then(products => {

		catalog.setProducts(products)

		card4.render({
			price: 85000, title: "новый титл", description: "большйо текст"
		})
	})
	.catch(err => {
		console.error(err);
	}); */



// Чтобы мониторить все события, для отладки

/* const gallery5 = document.querySelector('.gallery') as HTMLElement;

const cont = new Contacts(cloneTemplate('#contacts'), events);

gallery5.appendChild(cont.render({ valid: true, errors: [], email: 'test@example.com', phone: '+7 (123) 456-7890' }));
 */
/* const gallery6 = document.querySelector('.gallery') as HTMLElement;
const card5 = new Order(cloneTemplate('#order'), events);
gallery6.append(card5.render({ valid: true, errors: [], address: 'вава' }));  */