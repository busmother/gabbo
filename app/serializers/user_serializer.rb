class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :image
end
