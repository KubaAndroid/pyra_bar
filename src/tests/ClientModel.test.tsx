import { fireEvent, render, screen, act } from '@testing-library/react';
import ContactForm from '../components/contact/ContactForm';
import ClientModel from '../models/ClientModel';
import TestWrapper from './TestWrapper';

describe('test Client model', () => {
    it('new model created', () => {
        const mockModel: ClientModel = {
            id: 0,
            firstName: 'John',
            lastName: 'Doe',
        }
        expect(typeof mockModel.id).toBe('number')
        expect(mockModel.firstName).toBe('John')
        expect(typeof mockModel.firstName).toBe('string')
        
    })
})