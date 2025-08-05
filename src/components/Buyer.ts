import { IItem, IShipping } from '../types';

export class Buyer {
	protected persons: IShipping = {
		payment: '',
		address: '',
		email: '',
		phone: '',
	};
	setPerson(data: IShipping) {
		this.persons = { ...this.persons, ...data };
	}

	// Установка только адреса
	setAddress(address: string) {
		this.persons.address = address;
	}

	// Установка только email
	setEmail(email: string) {
		this.persons.email = email;
	}

	// Установка только телефона
	setPhone(phone: string) {
		this.persons.phone = phone;
	}

	// Установка только способа оплаты
	setPayment(payment: string) {
		this.persons.payment = payment;
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

	isValid(data: IShipping): boolean {
		if (!data.address) {
			console.log('адресс невведен', data.address);
			return false;
		}
		if (!data.email) {
			console.log('email невведен', data.email);
			return false;
		}
		if (!data.payment) {
			console.log('способ получения неуказан', data.payment);
			return false;
		}
		if (!data.phone) {
			console.log('телефон невведен', data.phone);
			return false;
		}
		return true;
	}
}
