class ChatSerializer
  include JSONAPI::Serializer
  attributes :messages, :sender_id, :recipient_id
  has_many :messages
end
