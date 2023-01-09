import PropTypes from 'prop-types'
import React, { Component, createContext, ReactNode, useContext, useState } from 'react'
import { MenuItemModel } from '../models/MenuItemModel'

type ContextProviderProps = {
    children: ReactNode
}

type OrderedItemsContext = {
    contextMenuItems: MenuItemModel[]
}

const CreateShopContext = createContext({} as OrderedItemsContext)

export function useShopContext() {
    return useContext(CreateShopContext)
}

export function ShopContext({ children }: ContextProviderProps) {
    const [contextMenuItems, setContextMenuItems] = useState<MenuItemModel[]>([])
    return (
        <CreateShopContext.Provider
            value={{
                contextMenuItems
            }}>
            {children}
            </CreateShopContext.Provider>
    )
    
}
