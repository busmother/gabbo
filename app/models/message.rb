class Message < ApplicationRecord
    belongs_to :chats
    belongs_to :user

    validates_presence_of :body, :chat_id, :user_id

end
