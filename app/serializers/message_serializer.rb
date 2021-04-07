class MessageSerializer
  include JSONAPI::Serializer
  attributes :body, :chat_id, :user_id
end
