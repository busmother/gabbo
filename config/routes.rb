Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users
      resources :users, only: [:index, :show]
      resources :chats, only: [:index, :create] do
        resources :messages, only: [:index, :create]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
