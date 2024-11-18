export interface Message {
    entity: string
    message: string
    newMessage: boolean
    created_date: Date | null
    message_id?: string
}