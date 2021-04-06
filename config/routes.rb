Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users
      resources :chats, only: [:index, :create] 
      resources :messages, only: [:index, :create]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
