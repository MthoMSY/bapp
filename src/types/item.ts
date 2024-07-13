export interface Item {
    id: string
    name: string
    description: string
    cost: number
    createdAt: Date
    updatedAt: Date | undefined
}