class MessageSerializer
  include JSONAPI::Serializer
  attributes :body, :chat_id, :sender_id, :recipient_id, :users
end
