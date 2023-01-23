import OrderItemModel from '../OrderItemModel';

describe('test Order Item model', () => {
    it('new model created', () => {
        const mockModel: OrderItemModel = {
            id: 0,
            quantity: 3,
            price: 123.32
        }

        expect(typeof mockModel.id).toBe('number')
        expect(mockModel.id).toBe(0)

        expect(typeof mockModel.quantity).toBe('number')
        expect(mockModel.quantity).toBe(3)

        expect(typeof mockModel.price).toBe('number')
        expect(mockModel.price).toBe(123.32)
    })
})