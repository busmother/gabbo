Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # root 'index'
      resources :users, only: [:index, :show, :create] do
        resources :chats, only: [:index, :show, :create] do
          resources :messages, only: [:index, :create]
        end
      end
    end
  end
end
