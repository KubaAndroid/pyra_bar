import ClientModel from '../ClientModel';

describe('test Client model', () => {
    
    it('new model created', () => {
        const mockModel: ClientModel = {
            id: 0,
            firstName: 'John',
            lastName: 'Doe',
        }
        expect(typeof mockModel.id).toBe('number');
        expect(mockModel.id).toBe(0);

        expect(typeof mockModel.firstName).toBe('string');
        expect(mockModel.firstName).toBe('John');

        expect(typeof mockModel.lastName).toBe('string');
        expect(mockModel.lastName).toBe('Doe');
    })
})