Rails.application.routes.draw do
  resources :responses
  # resources :polls, only: :index
  # resources :polls, only: [:index, :create]
  resources :polls, except: %i[new edit]
  resources :users, only: %i[create index]
  resource :sessions, only: [:create, :destroy]

  root 'home#index'
  get '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
