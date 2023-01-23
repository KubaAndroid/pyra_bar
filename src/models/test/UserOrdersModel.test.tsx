import UserOrdersModel from "../UserOrdersModel"

describe('test User Orders model', () => {
    it('new model created', () => {
        const mockModel: UserOrdersModel = {
            id: 0,
            userId: 123,
            date: "Mon, 23 Jan 2023 19:10:20",
            menuItems: [1,2,3,1,2]
        }

        expect(typeof mockModel.id).toBe('number')
        expect(mockModel.id).toBe(0)

        expect(typeof mockModel.userId).toBe('number')
        expect(mockModel.userId).toBe(123)

        expect(typeof mockModel.date).toBe('string')
        expect(mockModel.date).toMatch(/2023/)

        expect(typeof mockModel.menuItems).toBe('object')
        expect(mockModel.menuItems).toContain(3)
    })
})