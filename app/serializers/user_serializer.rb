class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :image, :index_chats_on_recipient_id, :index_chats_on_sender_id
end

#might need to make a serializer for recipient and another for sender specifically
#google self referential relationships w/models // polymorphic relationships