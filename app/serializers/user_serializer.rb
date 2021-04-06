class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :image, :index_chats_on_recipient_id, :index_chats_on_sender_id
end
