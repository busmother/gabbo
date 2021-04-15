class Api::V1::ChatsController < ApplicationController

    def index 
        user_id = params[:user_id].to_i
        sender_chats = Chat.all.select { |chat| chat.sender_id == user_id}
        recipient_chats = Chat.all.select { |chat| chat.recipient_id == user_id}
        all_chats = (sender_chats+recipient_chats).uniq
        options = {
            include: [:messages]
        }
        render json: ChatSerializer.new(all_chats, options)
    end

    def create
        chat = Chat.new(chat_params)
        if chat.save
            render json: chat, status: :accepted
        else
            render json: {errors: chat.errors.full_messages}, status: :unprocessible_entity
        end
    end

    private

    def chat_params
        params.require(:chat).permit(:sender_id, :recipient_id, :user_id)
    end
end
