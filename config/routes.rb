Rails.application.routes.draw do
  root 'homepage#index'
 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
   get '/homepage/fetch_data'
  # Defines the root path route ("/")
  # root "articles#index"
  put "/homepage/update_all"
end
