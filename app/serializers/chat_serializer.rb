class ChatSerializer
  include JSONAPI::Serializer
  attributes :messages, :sender_id, :recipient_id, :recipient, :sender
  has_many :messages, belongs_to: :sender
  has_many :messages, belongs_to: :recipient

  def recipient
    User.find(object.recipient_id)
  end

  def sender
    User.find(object.sender_id)
  end

  def current_user_chats(user_id)
    sender_chats = Chat.select { |chat| chat.sender_id == user_id}
    recipient_chats = Chat.select { |chat| chat.recipient_id == user_id}
    all_chats = (sender_chats+recipient_chats).uniq
    return all_chats
  end
  
end