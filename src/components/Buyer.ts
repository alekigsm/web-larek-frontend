import { IItem, IShipping } from '../types';
import { IEvents } from './base/events';

export class Buyer {
	protected persons: IShipping = {
		payment: '',
		address: '',
		email: '',
		phone: '',
	};
	constructor(protected events: IEvents) {

	}
	setPerson(data: IShipping) {
		this.persons = { ...this.persons, ...data };
		this.events.emit('person:changed')
	}

	// Установка только адреса
	setAddress(address: string) {
		this.persons.address = address;
		this.events.emit('address:changed')
	}

	// Установка только email
	setEmail(email: string) {
		this.persons.email = email;
		this.events.emit('email:changed')
	}

	// Установка только телефона
	setPhone(phone: string) {
		this.persons.phone = phone;
		this.events.emit('phone:changed')
	}

	// Установка только способа оплаты
	setPayment(payment: string) {
		this.persons.payment = payment;
		this.events.emit('payment:changed')
	}

	getSavePersonInfo(): IShipping {
		return this.persons;
	}

	// Получение конкретного поля
	getAddress(): string {
		return this.persons.address;
	}

	getEmail(): string {
		return this.persons.email;
	}

	getPhone(): string {
		return this.persons.phone;
	}

	getPayment(): string {
		return this.persons.payment;
	}

	validatePayment(): string {
		if (this.persons.payment == '') {
			return 'способ оплаты незаполнен';
		}
		return '';
	}

	validateaddress(): string {
		if (this.persons.address == '') {
			return 'адресс незаполнен';
		}
		return '';
	}

	validateEmail(): string {
		if (this.persons.email == '') {
			return 'email незаполнен';
		}
		return '';
	}

	validatePhone(): string {
		if (this.persons.phone == '') {
			return 'телефон незаполнен';
		}
		return '';
	}
}
