Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # root 'index'
      resources :users, only: [:index, :show, :create]
      resources :chats, only: [:index, :show, :create] do
        resources :messages, only: [:index, :create]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
