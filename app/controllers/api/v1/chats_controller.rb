class Api::V1::ChatsController < ApplicationController

    def index
        chats = Chat.all
        # render json: chats
        render json: ChatSerializer.new(chats)
    end

    def create
        chat = Chat.new(chat_params)
        if chat.save
            render json: chat, status: :accepted
        else
            render json: {errors: chat.errors.full_messages}, status: :unprocessible_entity
        end
    end
end
