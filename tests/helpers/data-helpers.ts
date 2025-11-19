import { faker } from '@faker-js/faker';

/**
 * Data generation helpers using Faker library
 * Provides methods to generate realistic test data
 */
export class DataHelper {
  /**
   * Generate a random user object
   */
  static generateUser() {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: this.generatePassword(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      createdAt: faker.date.past().toISOString(),
    };
  }

  /**
   * Generate a secure random password
   * @param length - Password length (default: 12)
   */
  static generatePassword(length = 12): string {
    return faker.internet.password({ length, memorable: false });
  }

  /**
   * Generate random text content
   * @param sentences - Number of sentences (default: 3)
   */
  static generateText(sentences = 3): string {
    return faker.lorem.sentences(sentences);
  }

  /**
   * Generate a random email address
   * @param domain - Optional domain name
   */
  static generateEmail(domain?: string): string {
    if (domain) {
      return `${faker.internet.userName()}@${domain}`;
    }
    return faker.internet.email();
  }

  /**
   * Generate a random phone number
   * @param format - Phone format (default: US format)
   */
  static generatePhoneNumber(format?: string): string {
    return faker.phone.number(format);
  }

  /**
   * Generate random number within range
   * @param min - Minimum value
   * @param max - Maximum value
   */
  static generateNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  /**
   * Generate random date
   * @param past - If true, generate past date; otherwise future
   */
  static generateDate(past = true): Date {
    return past ? faker.date.past() : faker.date.future();
  }

  /**
   * Generate random URL
   */
  static generateURL(): string {
    return faker.internet.url();
  }

  /**
   * Generate random company name
   */
  static generateCompanyName(): string {
    return faker.company.name();
  }

  /**
   * Generate random product data
   */
  static generateProduct() {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      inStock: faker.datatype.boolean(),
      sku: faker.string.alphanumeric(10).toUpperCase(),
    };
  }

  /**
   * Generate array of items
   * @param generator - Generator function
   * @param count - Number of items to generate
   */
  static generateArray<T>(generator: () => T, count: number): T[] {
    return Array.from({ length: count }, generator);
  }

  /**
   * Pick random item from array
   * @param array - Array to pick from
   */
  static pickRandom<T>(array: T[]): T {
    return faker.helpers.arrayElement(array);
  }

  /**
   * Generate unique identifier
   */
  static generateUUID(): string {
    return faker.string.uuid();
  }
}
