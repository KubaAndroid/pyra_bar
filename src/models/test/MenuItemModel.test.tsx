import MenuItemModel from '../MenuItemModel';

describe('test Menu Item model', () => {
    it('new model created', () => {
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghetti',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }
        expect(typeof mockModel.id).toBe('number');
        expect(mockModel.id).toBe(0);

        expect(typeof mockModel.name).toBe('string');
        expect(mockModel.name).toBe('Spaghetti');

        expect(typeof mockModel.price).toBe('number');
        expect(mockModel.price).toBe(12.23);

        expect(typeof mockModel.description).toBe('string');;
        expect(mockModel.description).toBe('Delish Spaghet')

        expect(typeof mockModel.imgUrl).toBe('string');
        expect(mockModel.imgUrl).toMatch(/jpg/);
    })
})