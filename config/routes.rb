ToDoList::Application.routes.draw do
  devise_for :users
  root :to =>'main#index'
  get "user_info"  => "main#get_user_info"

end
