import OrderModel from '../OrderModel';

describe('test Order Cart model', () => {
    it('new model created', () => {
        const mockModel: OrderModel = {
            id: 0,
            quantity: 3,
        }

        expect(typeof mockModel.id).toBe('number')
        expect(mockModel.id).toBe(0)

        expect(typeof mockModel.quantity).toBe('number')
        expect(mockModel.quantity).toBe(3)
    })
})