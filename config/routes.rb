Rails.application.routes.draw do
  # resources :polls, only: :index
  # resources :polls, only: [:index, :create]
  resources :polls, except: %i[new edit]

  root 'home#index'
  get '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
