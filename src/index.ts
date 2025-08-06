import { Buyer } from './components/Buyer';
import { Catalog } from './components/Catalog';
import { LarekApi } from './components/LarekApi';
import { ModelBasket } from './components/ModelBasket';
import './scss/styles.scss';
import { IOrder, IShipping } from './types';
import { serverData } from './utils/constants';


/* const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#bcard-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success'); */

const catalog = new Catalog();
catalog.setProducts(serverData.items);

console.log('catalog', catalog.getProducts());

catalog.setSelectedProduct(serverData.items[5]);

console.log('selected product', catalog.getSelectedProduct());

console.log(
	'find product',
	catalog.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')
);

console.log();

///корзина
const bas = new ModelBasket();
bas.addProduct(serverData.items[1]);
console.log('кол-во в корзине', bas.getCountProduct());
bas.addProduct(serverData.items[4]);
console.log('список товара 1', bas.getListedProduct());
console.log('кол-во в корзине', bas.getCountProduct());
bas.delProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log('после кол-во в корзине', bas.getCountProduct());
console.log('список товара 2', bas.getListedProduct());
bas.delProduct('1c521d84-c48d-48fa-8cfb-9d911fa515fd');
console.log('наличие товара', bas.hasProduct());
bas.addProduct(serverData.items[1]);
bas.addProduct(serverData.items[1]);
bas.addProduct(serverData.items[4]);
console.log('сумма', bas.getTotalPrice());

//покупатель
const testData: IShipping = {
	payment: 'card',
	address: 'ул. Пушкина, д. 10',
	email: 'ivan@mail.com',
	phone: '+79123456789',
};
const testAddress: IShipping = {
	payment: 'card',
	address: '',
	email: 'ivan@mail.com',
	phone: '+79123456789',
};
const testEmail: IShipping = {
	payment: 'card',
	address: 'ул. Пушкина, д. 10',
	email: '',
	phone: '+79123456789',
};
const testPhone: IShipping = {
	payment: 'card',
	address: 'ул. Пушкина, д. 10',
	email: 'ivan@mail.com',
	phone: '',
};
const testPayment: IShipping = {
	payment: '',
	address: 'ул. Пушкина, д. 10',
	email: 'ivan@mail.com',
	phone: '+79123456789',
};
const pers = new Buyer();
pers.setPerson(testData);
console.log(pers.getSavePersonInfo());
testData.address = 'новый адрес';
pers.setAddress(testData.address);
console.log(pers.getAddress());
testData.email = 'новая почта';
pers.setEmail(testData.email);
console.log(pers.getEmail());
testData.payment = 'новый способ оплаты';
pers.setPayment(testData.payment);
console.log(pers.getPayment());
testData.phone = 'новый тел';
pers.setPhone(testData.phone);
console.log(pers.getPhone());
console.log(pers.getSavePersonInfo());
/* console.log('все ввели', pers.isValid(testData));
console.log('нет адресса', pers.isValid(testAddress));
console.log('нет мыла', pers.isValid(testEmail));
console.log('нет тел.', pers.isValid(testPhone));
console.log('нет способа оплаты', pers.isValid(testPayment)); */
//


const weblarek = new LarekApi('', 'https://larek-api.nomoreparties.co/api/weblarek');

const order: IOrder = {
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

weblarek.getProductList()
	.then(products => catalog.setProducts(products))
	.catch(err => {
		console.error(err);
	});


// Получаем лоты с сервера
/* api.getLotList()
	.then(appData.setCatalog.bind(appData))
	.catch(err => {
		console.error(err);
	}); */