class ChatSerializer
  include JSONAPI::Serializer
  attributes :sender_id, :recipient_id, :messages
end
